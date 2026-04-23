'use client';

import { useEventBus } from '@/lib/events/hooks/use-event-bus';
import { PROJECT_EVENTS } from '@/lib/events/project-events';
import { ProjectCreatedEventPayload } from '@/lib/events/project-events';
import { toast } from 'sonner';

export function ProjectEventNotifications() {
  useEventBus<ProjectCreatedEventPayload>(
    PROJECT_EVENTS.PROJECT_CREATED,
    {
      handle: async (event) => {
        toast.success(`New project "${event.data.project.name}" created by ${event.data.createdBy}`);
      }
    }
  );

  useEventBus(
    PROJECT_EVENTS.PROJECT_FAVORITED,
    {
      handle: async (event) => {
        const action = event.data.favorited ? 'favorited' : 'unfavorited';
        toast(`Project ${action}`);
      }
    }
  );

  return null;
}