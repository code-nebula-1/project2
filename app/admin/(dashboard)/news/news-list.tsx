'use client';

import { useState } from 'react';
import { News, createNews, updateNews, deleteNews } from '@/actions/news';
import { detectPlatform } from '@/lib/social-utils';
import { Pencil, Trash2, Plus, ExternalLink, Star, StarOff, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

type NewsListProps = {
  initialNews: News[];
};

const NEWS_TYPES = [
  { value: 'announcement', label: 'Announcement' },
  { value: 'blog', label: 'Blog Post' },
  { value: 'social_embed', label: 'Social Media Embed' },
];

const PLATFORMS = [
  { value: '', label: 'None' },
  { value: 'twitter', label: 'Twitter / X' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'medium', label: 'Medium' },
  { value: 'pinterest', label: 'Pinterest' },
];

export function NewsList({ initialNews }: NewsListProps) {
  const [news, setNews] = useState<News[]>(initialNews);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    url: '',
    type: 'announcement',
    platform: '',
    featured: false,
    status: true,
    addedBy: '',
    publishedAt: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      url: '',
      type: 'announcement',
      platform: '',
      featured: false,
      status: true,
      addedBy: '',
      publishedAt: '',
    });
    setError(null);
  };

  // Auto-detect platform when URL changes
  const handleUrlChange = (url: string) => {
    setFormData(prev => {
      const detectedPlatform = detectPlatform(url);
      return {
        ...prev,
        url,
        platform: detectedPlatform || prev.platform,
        // Auto-set type to social_embed if platform is detected
        type: detectedPlatform ? 'social_embed' : prev.type,
      };
    });
  };

  const handleCreate = async () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await createNews({
      title: formData.title,
      content: formData.content || undefined,
      url: formData.url || undefined,
      type: formData.type,
      platform: formData.platform || undefined,
      featured: formData.featured,
      status: formData.status,
      addedBy: formData.addedBy || undefined,
      publishedAt: formData.publishedAt || undefined,
    });

    if (result.success && result.news) {
      setNews([result.news, ...news]);
      setIsCreateDialogOpen(false);
      resetForm();
    } else {
      setError(result.error || 'Failed to create news');
    }

    setIsLoading(false);
  };

  const handleEdit = (item: News) => {
    setSelectedNews(item);
    setFormData({
      title: item.title,
      content: item.content || '',
      url: item.url || '',
      type: item.type,
      platform: item.platform || '',
      featured: item.featured,
      status: item.status,
      addedBy: item.addedBy || '',
      publishedAt: item.publishedAt ? new Date(item.publishedAt).toISOString().slice(0, 16) : '',
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedNews) return;

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await updateNews(selectedNews.id, {
      title: formData.title,
      content: formData.content || undefined,
      url: formData.url || undefined,
      type: formData.type,
      platform: formData.platform || undefined,
      featured: formData.featured,
      status: formData.status,
      addedBy: formData.addedBy || undefined,
      publishedAt: formData.publishedAt || null,
    });

    if (result.success && result.news) {
      setNews(news.map((n) => (n.id === selectedNews.id ? result.news! : n)));
      setIsEditDialogOpen(false);
      setSelectedNews(null);
      resetForm();
    } else {
      setError(result.error || 'Failed to update news');
    }

    setIsLoading(false);
  };

  const handleDeleteClick = (item: News) => {
    setSelectedNews(item);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedNews) return;

    setIsLoading(true);

    const result = await deleteNews(selectedNews.id);

    if (result.success) {
      setNews(news.filter((n) => n.id !== selectedNews.id));
      setIsDeleteDialogOpen(false);
      setSelectedNews(null);
    } else {
      setError(result.error || 'Failed to delete news');
    }

    setIsLoading(false);
  };

  const toggleFeatured = async (item: News) => {
    const result = await updateNews(item.id, { featured: !item.featured });
    if (result.success && result.news) {
      setNews(news.map((n) => (n.id === item.id ? result.news! : n)));
    }
  };

  const toggleStatus = async (item: News) => {
    const result = await updateNews(item.id, { status: !item.status });
    if (result.success && result.news) {
      setNews(news.map((n) => (n.id === item.id ? result.news! : n)));
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'blog':
        return 'bg-blue-100 text-blue-800';
      case 'announcement':
        return 'bg-green-100 text-green-800';
      case 'social_embed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };

  // Form dialog content (shared between create and edit)
  const FormContent = () => (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="News title"
        />
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {NEWS_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="News content or description"
          rows={4}
        />
      </div>

      <div>
        <Label htmlFor="url">URL (for links or social embeds)</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://twitter.com/... or https://example.com/blog/..."
        />
        <p className="text-xs text-gray-500 mt-1">
          For social embeds, paste the post URL. Platform will be auto-detected.
        </p>
      </div>

      {formData.type === 'social_embed' && (
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Select
            value={formData.platform}
            onValueChange={(value) => setFormData({ ...formData, platform: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              {PLATFORMS.map((platform) => (
                <SelectItem key={platform.value || 'none'} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="addedBy">Added By (optional)</Label>
          <Input
            id="addedBy"
            value={formData.addedBy}
            onChange={(e) => setFormData({ ...formData, addedBy: e.target.value })}
            placeholder="Author name"
          />
        </div>
        <div>
          <Label htmlFor="publishedAt">Published Date (optional)</Label>
          <Input
            id="publishedAt"
            type="datetime-local"
            value={formData.publishedAt}
            onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center space-x-2">
          <Switch
            id="status"
            checked={formData.status}
            onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
          />
          <Label htmlFor="status">Active (visible on site)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="featured"
            checked={formData.featured}
            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-4">
        <Button
          variant="admin"
          size="admin"
          onClick={() => {
            resetForm();
            setIsCreateDialogOpen(true);
          }}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add News
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {news.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No news items yet. Click &quot;Add News&quot; to create one.
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div className="font-medium truncate">{item.title}</div>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View link
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getTypeBadgeColor(item.type)}>
                        {item.type.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.platform || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.addedBy || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(item.publishedAt || item.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatus(item)}
                        className={`p-1 rounded hover:bg-gray-100 ${item.status ? 'text-green-500' : 'text-gray-400'
                          }`}
                        title={item.status ? 'Active (click to hide)' : 'Hidden (click to show)'}
                      >
                        {item.status ? (
                          <Eye className="w-5 h-5" />
                        ) : (
                          <EyeOff className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(item)}
                        className={`p-1 rounded hover:bg-gray-100 ${item.featured ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                      >
                        {item.featured ? (
                          <Star className="w-5 h-5 fill-current" />
                        ) : (
                          <StarOff className="w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New News Item</DialogTitle>
          </DialogHeader>
          <FormContent />
          <DialogFooter>
            <Button
              variant="outline"
              size="admin"
              onClick={() => {
                setIsCreateDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button variant="admin" size="admin" onClick={handleCreate} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit News Item</DialogTitle>
          </DialogHeader>
          <FormContent />
          <DialogFooter>
            <Button
              variant="outline"
              size="admin"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedNews(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button variant="admin" size="admin" onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the news item &quot;{selectedNews?.title}&quot;. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedNews(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
