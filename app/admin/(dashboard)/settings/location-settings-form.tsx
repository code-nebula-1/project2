'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateMapLocationSettings, type SettingResult, type MapLocationData } from '@/actions/settings';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface LocationSettingsFormProps {
  settings: SettingResult<MapLocationData>;
}

export function LocationSettingsForm({ settings }: LocationSettingsFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    status: settings.status,
    name: settings.data.name || '',
    description: settings.data.description || '',
    lat: settings.data.lat || 0,
    lng: settings.data.lng || 0,
    zoom: settings.data.zoom || 15,
    address: settings.data.address || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateMapLocationSettings(
        {
          name: formData.name,
          description: formData.description,
          lat: formData.lat,
          lng: formData.lng,
          zoom: formData.zoom,
          address: formData.address,
        },
        formData.status
      );

      toast({
        title: 'Success',
        description: 'Location settings updated successfully',
      });

      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update location settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Location Section Toggle */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Location Settings</h3>
          <p className="text-sm text-gray-600 mb-4">
            Configure the map location displayed on your website.
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex-1">
            <Label htmlFor="show-location" className="text-base font-medium">
              Show Location Map
            </Label>
            <p className="text-sm text-gray-600 mt-1">
              Display the location map on the public website
            </p>
          </div>
          <Switch
            id="show-location"
            checked={formData.status}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, status: checked })
            }
          />
        </div>

        {/* Location Name */}
        <div className="space-y-2">
          <Label htmlFor="location-name">Location Name</Label>
          <Input
            id="location-name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="e.g., Research Lab"
            disabled={!formData.status}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="location-description">Description</Label>
          <Textarea
            id="location-description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe the purpose of this location..."
            rows={3}
            disabled={!formData.status}
          />
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="location-address">Address</Label>
          <Input
            id="location-address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            placeholder="e.g., 1 University Ave, Lowell, MA 01854"
            disabled={!formData.status}
          />
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location-lat">Latitude</Label>
            <Input
              id="location-lat"
              type="number"
              step="any"
              value={formData.lat}
              onChange={(e) =>
                setFormData({ ...formData, lat: parseFloat(e.target.value) || 0 })
              }
              placeholder="42.6334"
              disabled={!formData.status}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location-lng">Longitude</Label>
            <Input
              id="location-lng"
              type="number"
              step="any"
              value={formData.lng}
              onChange={(e) =>
                setFormData({ ...formData, lng: parseFloat(e.target.value) || 0 })
              }
              placeholder="-71.3162"
              disabled={!formData.status}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location-zoom">Zoom Level</Label>
            <Input
              id="location-zoom"
              type="number"
              min="1"
              max="20"
              value={formData.zoom}
              onChange={(e) =>
                setFormData({ ...formData, zoom: parseInt(e.target.value) || 15 })
              }
              placeholder="15"
              disabled={!formData.status}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500">
          You can find coordinates by right-clicking on Google Maps and selecting the coordinates.
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-gray-200">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}


