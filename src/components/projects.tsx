"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A fully functional e-commerce platform built with Next.js, Stripe, and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Stripe"],
    link: "#",
    github: "#",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management tool with real-time updates using Socket.io.",
    tags: ["React", "Express", "Socket.io"],
    link: "#",
    github: "#",
  },
  {
    title: "AI Dashboard",
    description:
      "Analytics dashboard powered by AI to provide insights into user behavior.",
    tags: ["Next.js", "OpenAI", "Chart.js"],
    link: "#",
    github: "#",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={project.github}>
                    <Github className="mr-2 h-4 w-4" /> Code
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href={project.link}>
                    <ExternalLink className="mr-2 h-4 w-4" /> Demo
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
