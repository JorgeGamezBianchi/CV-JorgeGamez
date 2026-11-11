/**
 * @file skills.data.ts
 * @description Datos tipados de las competencias técnicas, stacks y herramientas.
 * Capa: Infrastructure / Data
 */

import type { SkillCategory } from '../../core/domain/skill.model';

export const skillsData: readonly SkillCategory[] = [
  {
    categoryName: 'Backend / .NET',
    skills: [
      { name: 'C#', deviconClass: 'devicon-csharp-plain colored' },
      { name: '.NET / ASP.NET', deviconClass: 'devicon-dotnetcore-plain colored' }
    ],
    chips: ['Entity Framework', 'LINQ', 'ADO.NET', 'Web API']
  },
  {
    categoryName: 'Frontend',
    skills: [
      { name: 'HTML 5', deviconClass: 'devicon-html5-plain colored' },
      { name: 'CSS 3', deviconClass: 'devicon-css3-plain colored' },
      { name: 'JavaScript', deviconClass: 'devicon-javascript-plain colored' },
      { name: 'Bootstrap', deviconClass: 'devicon-bootstrap-plain colored' },
      { name: 'jQuery', deviconClass: 'devicon-jquery-plain colored' },
      { name: 'React', deviconClass: 'devicon-react-original colored' },
      { name: 'Angular', deviconClass: 'devicon-angular-plain colored' }
    ]
  },
  {
    categoryName: 'Bases de Datos',
    skills: [
      { name: 'MS SQL Server', deviconClass: 'devicon-microsoftsqlserver-plain colored' },
      { name: 'MySQL', deviconClass: 'devicon-mysql-plain colored' },
      { name: 'PostgreSQL', deviconClass: 'devicon-postgresql-plain colored' }
    ],
    chips: ['Stored Procedures', 'Triggers', 'Vistas']
  },
  {
    categoryName: 'Arquitectura / Patrones',
    skills: [],
    chips: ['Clean Architecture', 'MVC', 'REST API', 'SOLID', 'Clean Code', 'Code Refactoring']
  },
  {
    categoryName: 'Mobile',
    skills: [
      { name: 'Kotlin', deviconClass: 'devicon-kotlin-plain colored' },
      { name: 'Flutter', deviconClass: 'devicon-flutter-plain colored' },
      { name: 'Dart', deviconClass: 'devicon-dart-plain colored' }
    ],
    chips: ['Jetpack Compose']
  },
  {
    categoryName: 'DevOps / Herramientas',
    skills: [
      { name: 'Git', deviconClass: 'devicon-git-plain colored' },
      { name: 'GitHub', deviconClass: 'devicon-github-original colored' },
      { name: 'Postman', deviconClass: 'devicon-postman-plain colored' },
      { name: 'Visual Studio', deviconClass: 'devicon-visualstudio-plain colored' },
      { name: 'VS Code', deviconClass: 'devicon-vscode-plain colored' },
      { name: 'Docker', deviconClass: 'devicon-docker-plain colored' }
    ],
    chips: ['IIS', 'n8n']
  },
  {
    categoryName: 'AI Tools & Automation',
    skills: [],
    chips: ['Claude Code', 'Gemini CLI', 'OpenCode', 'Antigravity CLI', 'Ollama']
  }
];
