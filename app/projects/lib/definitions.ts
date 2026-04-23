import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string({ required_error: "Project name is required" })
    .min(1, "Project name is required")
    .max(64, "Project name must be less than 64 characters"),
  description: z.string().optional(),
  members: z.string().optional(),
});

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

export type Project = z.infer<typeof projectSchema>;
export type ProjectInfoType = z.infer<typeof projectInfoSchema>;
export type ProjectMembersType = z.infer<typeof projectMembersSchema>;
export type ProjectType = ProjectInfoType & ProjectMembersType;
