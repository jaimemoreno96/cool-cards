"use server";

import { cachedAuth } from "@/app/lib/session";
import { Project } from "../lib/definitions";
import { prisma } from "@/lib/prisma";
import { projectDto } from "./dto/project";

export const createProject = async (data: Project) => {
  try {
    const session = await cachedAuth();
    console.log("Session:", session);
    const user = session?.user;

    const members = data.members?.split(",") || [];

    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        members: members,
        userId: user?.id || "", // Ensure userId is set, fallback to empty string if user is not found
      },
    });

    return projectDto(project);
  } catch (error) {
    console.error("Error creating project:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export const getProjects = async () => {
  try {
    const session = await cachedAuth();
    console.log("Session:", session);
    const user = session?.user;

    const projects = await prisma.project.findMany({
      where: {
        userId: user?.id,
      },
    });

    // Map the projects to a simpler object structure
    const mappedProjects = projects.map(projectDto);

    return mappedProjects;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const setFavoriteProject = async (
  projectId: string,
  favorite: boolean
) => {
  try {
    await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        favorite: favorite,
      },
    });
  } catch (error) {
    console.error("Error setting favorite project:", error);
    throw error; // Re-throw the error for further handling if needed
  }
};
