'use client';

import { useState } from 'react';
import { Publication, createPublication, updatePublication, deletePublication } from '@/actions/publications';
import { User } from '@/actions/users';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

type PublicationsListProps = {
  initialPublications: Publication[];
  users: User[];
};

export function PublicationsList({ initialPublications, users }: PublicationsListProps) {
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    abstract: '',
    authors: '',
    journal: '',
    year: '',
    doi: '',
    url: '',
    pdfUrl: '',
    citationCount: '',
    createdById: users[0]?.id || '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      abstract: '',
      authors: '',
      journal: '',
      year: '',
      doi: '',
      url: '',
      pdfUrl: '',
      citationCount: '',
      createdById: users[0]?.id || '',
    });
    setError(null);
  };

  const handleCreate = async () => {
    setIsLoading(true);
    setError(null);

    const result = await createPublication({
      title: formData.title,
      abstract: formData.abstract || undefined,
      authors: formData.authors.split(',').map(a => a.trim()).filter(Boolean),
      journal: formData.journal || undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
      doi: formData.doi || undefined,
      url: formData.url || undefined,
      pdfUrl: formData.pdfUrl || undefined,
      citationCount: formData.citationCount ? parseInt(formData.citationCount) : undefined,
      createdById: formData.createdById,
    });

    if (result.success && result.publication) {
      setPublications([result.publication, ...publications]);
      setIsCreateDialogOpen(false);
      resetForm();
    } else {
      setError(result.error || 'Failed to create publication');
    }

    setIsLoading(false);
  };

  const handleEdit = (publication: Publication) => {
    setSelectedPublication(publication);
    setFormData({
      title: publication.title,
      abstract: publication.abstract || '',
      authors: publication.authors.join(', '),
      journal: publication.journal || '',
      year: publication.year?.toString() || '',
      doi: publication.doi || '',
      url: publication.url || '',
      pdfUrl: publication.pdfUrl || '',
      citationCount: publication.citationCount?.toString() || '',
      createdById: publication.createdById,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedPublication) return;

    setIsLoading(true);
    setError(null);

    const result = await updatePublication(selectedPublication.id, {
      title: formData.title,
      abstract: formData.abstract || undefined,
      authors: formData.authors.split(',').map(a => a.trim()).filter(Boolean),
      journal: formData.journal || undefined,
      year: formData.year ? parseInt(formData.year) : undefined,
      doi: formData.doi || undefined,
      url: formData.url || undefined,
      pdfUrl: formData.pdfUrl || undefined,
      citationCount: formData.citationCount ? parseInt(formData.citationCount) : undefined,
    });

    if (result.success && result.publication) {
      setPublications(
        publications.map((p) => (p.id === selectedPublication.id ? result.publication! : p))
      );
      setIsEditDialogOpen(false);
      setSelectedPublication(null);
      resetForm();
    } else {
      setError(result.error || 'Failed to update publication');
    }

    setIsLoading(false);
  };

  const handleDeleteClick = (publication: Publication) => {
    setSelectedPublication(publication);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedPublication) return;

    setIsLoading(true);

    const result = await deletePublication(selectedPublication.id);

    if (result.success) {
      setPublications(publications.filter((p) => p.id !== selectedPublication.id));
      setIsDeleteDialogOpen(false);
      setSelectedPublication(null);
    } else {
      setError(result.error || 'Failed to delete publication');
    }

    setIsLoading(false);
  };

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
          Add Publication
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
                  Authors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Journal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Citations
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {publications.map((publication) => (
                <tr key={publication.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                    <div className="font-medium">{publication.title}</div>
                    {publication.doi && (
                      <div className="text-xs text-gray-500 mt-1">DOI: {publication.doi}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                    {publication.authors.slice(0, 2).join(', ')}
                    {publication.authors.length > 2 && ` +${publication.authors.length - 2} more`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {publication.journal || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {publication.year || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {publication.citationCount || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(publication)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(publication)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Publication</DialogTitle>
          </DialogHeader>
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
                placeholder="Publication title"
              />
            </div>
            <div>
              <Label htmlFor="abstract">Abstract</Label>
              <Textarea
                id="abstract"
                value={formData.abstract}
                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                placeholder="Publication abstract"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="authors">Authors (comma-separated) *</Label>
              <Input
                id="authors"
                value={formData.authors}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                placeholder="John Doe, Jane Smith"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="journal">Journal</Label>
                <Input
                  id="journal"
                  value={formData.journal}
                  onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                  placeholder="Journal name"
                />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2024"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="doi">DOI</Label>
              <Input
                id="doi"
                value={formData.doi}
                onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                placeholder="10.1000/xyz123"
              />
            </div>
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://example.com/publication"
              />
            </div>
            <div>
              <Label htmlFor="pdfUrl">PDF URL</Label>
              <Input
                id="pdfUrl"
                type="url"
                value={formData.pdfUrl}
                onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                placeholder="https://example.com/publication.pdf"
              />
            </div>
            <div>
              <Label htmlFor="citationCount">Citation Count</Label>
              <Input
                id="citationCount"
                type="number"
                value={formData.citationCount}
                onChange={(e) => setFormData({ ...formData, citationCount: e.target.value })}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="createdById">Created By</Label>
              <Select
                value={formData.createdById}
                onValueChange={(value) => setFormData({ ...formData, createdById: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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
            <DialogTitle>Edit Publication</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-abstract">Abstract</Label>
              <Textarea
                id="edit-abstract"
                value={formData.abstract}
                onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="edit-authors">Authors (comma-separated)</Label>
              <Input
                id="edit-authors"
                value={formData.authors}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-journal">Journal</Label>
                <Input
                  id="edit-journal"
                  value={formData.journal}
                  onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-doi">DOI</Label>
              <Input
                id="edit-doi"
                value={formData.doi}
                onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-url">URL</Label>
              <Input
                id="edit-url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-pdfUrl">PDF URL</Label>
              <Input
                id="edit-pdfUrl"
                type="url"
                value={formData.pdfUrl}
                onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-citationCount">Citation Count</Label>
              <Input
                id="edit-citationCount"
                type="number"
                value={formData.citationCount}
                onChange={(e) => setFormData({ ...formData, citationCount: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="admin"
              onClick={() => {
                setIsEditDialogOpen(false);
                setSelectedPublication(null);
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
              This will permanently delete the publication "{selectedPublication?.title}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedPublication(null)}>
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

