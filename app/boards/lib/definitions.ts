import { z } from "zod";

export const projectInfoSchema = z.object({
  name: z
    .string({ required_error: "Project name is required" })
    .min(1, "Project name is required")
    .max(64, "Project name must be less than 64 characters"),
  description: z.string().optional(),
});

export const projectMembersSchema = z.object({
  members: z.string().optional(),
});

export const boardSchema = z.object({
  name: z
    .string({ required_error: "Board name is required" })
    .min(1, "Board name is required")
    .max(64, "Board name must be less than 64 characters"),
  description: z.string().optional(),
  projectId: z.string().optional(),
  members: z.string().optional(),
});

export const boardMembersSchema = z.object({
  members: z.string().optional(),
});

export type ProjectInfoType = z.infer<typeof projectInfoSchema>;
export type ProjectMembersType = z.infer<typeof projectMembersSchema>;
export type ProjectType = ProjectInfoType & ProjectMembersType;
export type Board = z.infer<typeof boardSchema>;
export type BoardInfoType = z.infer<typeof boardSchema>;
export type BoardMembersType = z.infer<typeof boardMembersSchema>;
