'use client';

import { useState } from 'react';
import { Team, createTeamMember, updateTeamMember, deleteTeamMember } from '@/actions/teams';
import { Pencil, Trash2, Plus, ExternalLink } from 'lucide-react';
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
import Image from 'next/image';

type TeamsListProps = {
    initialTeams: Team[];
};

export function TeamsList({ initialTeams }: TeamsListProps) {
    const [teams, setTeams] = useState<Team[]>(initialTeams);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form states
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        contact: '',
        description: '',
        image: '',
        website: '',
    });

    const resetForm = () => {
        setFormData({
            name: '',
            role: '',
            contact: '',
            description: '',
            image: '',
            website: '',
        });
        setError(null);
    };

    const handleCreate = async () => {
        if (!formData.name.trim()) {
            setError('Name is required');
            return;
        }

        setIsLoading(true);
        setError(null);

        const result = await createTeamMember({
            name: formData.name,
            role: formData.role || undefined,
            contact: formData.contact || undefined,
            description: formData.description || undefined,
            image: formData.image || undefined,
            website: formData.website || undefined,
        });

        if (result.success && result.team) {
            setTeams([result.team, ...teams]);
            setIsCreateDialogOpen(false);
            resetForm();
        } else {
            setError(result.error || 'Failed to create team member');
        }

        setIsLoading(false);
    };

    const handleEdit = (team: Team) => {
        setSelectedTeam(team);
        setFormData({
            name: team.name,
            role: team.role || '',
            contact: team.contact || '',
            description: team.description || '',
            image: team.image || '',
            website: team.website || '',
        });
        setIsEditDialogOpen(true);
    };

    const handleUpdate = async () => {
        if (!selectedTeam) return;

        if (!formData.name.trim()) {
            setError('Name is required');
            return;
        }

        setIsLoading(true);
        setError(null);

        const result = await updateTeamMember(selectedTeam.id, {
            name: formData.name,
            role: formData.role || undefined,
            contact: formData.contact || undefined,
            description: formData.description || undefined,
            image: formData.image || undefined,
            website: formData.website || undefined,
        });

        if (result.success && result.team) {
            setTeams(
                teams.map((t) => (t.id === selectedTeam.id ? result.team! : t))
            );
            setIsEditDialogOpen(false);
            setSelectedTeam(null);
            resetForm();
        } else {
            setError(result.error || 'Failed to update team member');
        }

        setIsLoading(false);
    };

    const handleDeleteClick = (team: Team) => {
        setSelectedTeam(team);
        setIsDeleteDialogOpen(true);
    };

    const handleDelete = async () => {
        if (!selectedTeam) return;

        setIsLoading(true);

        const result = await deleteTeamMember(selectedTeam.id);

        if (result.success) {
            setTeams(teams.filter((t) => t.id !== selectedTeam.id));
            setIsDeleteDialogOpen(false);
            setSelectedTeam(null);
        } else {
            setError(result.error || 'Failed to delete team member');
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
                    Add Team Member
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Member
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Website
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {teams.map((team) => (
                                <tr key={team.id}>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        <div className="flex items-center gap-3">
                                            {team.image && (
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                                    <Image
                                                        src={team.image}
                                                        alt={team.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="font-medium">{team.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                                        {team.role || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {team.contact ? (
                                            <a
                                                href={`mailto:${team.contact}`}
                                                className="text-blue-600 hover:text-blue-900 hover:underline"
                                            >
                                                {team.contact}
                                            </a>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {team.website ? (
                                            <a
                                                href={team.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-900 hover:underline inline-flex items-center gap-1"
                                            >
                                                Link
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        ) : (
                                            '-'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(team)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(team)}
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
                        <DialogTitle>Add New Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}
                        <div>
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Full name"
                            />
                        </div>
                        <div>
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                placeholder="Position or title"
                            />
                        </div>
                        <div>
                            <Label htmlFor="contact">Contact Email</Label>
                            <Input
                                id="contact"
                                type="email"
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                placeholder="email@example.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Bio or description"
                                rows={6}
                            />
                        </div>
                        <div>
                            <Label htmlFor="image">Image URL</Label>
                            <Input
                                id="image"
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>
                        <div>
                            <Label htmlFor="website">Website URL</Label>
                            <Input
                                id="website"
                                type="url"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                placeholder="https://example.com"
                            />
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
                        <DialogTitle>Edit Team Member</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}
                        <div>
                            <Label htmlFor="edit-name">Name *</Label>
                            <Input
                                id="edit-name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-role">Role</Label>
                            <Input
                                id="edit-role"
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-contact">Contact Email</Label>
                            <Input
                                id="edit-contact"
                                type="email"
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                                id="edit-description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={6}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-image">Image URL</Label>
                            <Input
                                id="edit-image"
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-website">Website URL</Label>
                            <Input
                                id="edit-website"
                                type="url"
                                value={formData.website}
                                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            size="admin"
                            onClick={() => {
                                setIsEditDialogOpen(false);
                                setSelectedTeam(null);
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
                            This will permanently delete &quot;{selectedTeam?.name}&quot; from the team. This
                            action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setSelectedTeam(null)}>
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

