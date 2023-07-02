"use client";

import { ChevronsUpDown, Command, Check } from "lucide-react";
import React from "react";
import { Button } from "../../../global/components/ui/button";
import {
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../../../global/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../global/components/ui/popover";
import { cn } from "../../../global/utils";

const skillsData = {
  Design: [
    "Adobe XD",
    "Animation",
    "AR/VR Design",
    "Bootstrap",
    "Color Theory",
    "CSS3",
    "Figma",
    "Graphic Design",
    "HTML5",
    "Illustrator",
    "InDesign",
    "Interaction Design",
    "Motion Graphics",
    "Photoshop",
    "Prototyping",
    "Responsive Design",
    "Sketch",
    "Typography",
    "UI Design",
    "UX Research",
    "UX Design",
    "Web Design",
    "Wireframing",
  ],
  Management: [
    "Agile Methodologies",
    "Budgeting",
    "Business Strategy",
    "Change Management",
    "Conflict Resolution",
    "Data-driven Decision Making",
    "Emotional Intelligence",
    "ITIL",
    "Kanban",
    "Leadership",
    "Lean",
    "Negotiation",
    "Performance Management",
    "Prince2",
    "Project Management",
    "Resource Management",
    "Risk Management",
    "Scrum",
    "Strategic Planning",
    "Team Building",
    "Waterfall",
  ],
  Marketing: [
    "AB Testing",
    "Affiliate Marketing",
    "Brand Management",
    "Content Marketing",
    "Conversion Rate Optimization",
    "Copywriting",
    "CRM",
    "Data Analysis",
    "Email Marketing",
    "Facebook Ads",
    "Google Adwords",
    "Google Analytics",
    "Google Tag Manager",
    "Market Research",
    "Marketing Automation",
    "Marketing Strategy",
    "Mobile Advertising",
    "PPC",
    "Public Relations",
    "SEO",
    "SEM",
    "Social Media Marketing",
    "Video Marketing",
    "Viral Marketing",
    "Web Analytics",
    "YouTube Marketing",
  ],
  Programming: [
    ".NET",
    "Android Development",
    "AngularJS",
    "API Development",
    "ASP.NET",
    "AWS",
    "Bash/Shell",
    "C",
    "C#",
    "C++",
    "CSS",
    "Django",
    "Docker",
    "Drupal",
    "Flutter",
    "Frontend Development",
    "Go",
    "HTML",
    "iOS Development",
    "Java",
    "JavaScript",
    "Kotlin",
    "Laravel",
    "MongoDB",
    "MySQL",
    "Node.js",
    "Objective-C",
    "Perl",
    "PHP",
    "Python",
    "React.js",
    "Ruby",
    "Ruby on Rails",
    "Rust",
    "Scala",
    "SQL",
    "Swift",
    "TypeScript",
    "Vue.js",
    "Web Development",
    "WordPress",
  ],
  Sales: [
    "Account Management",
    "B2B Sales",
    "B2C Sales",
    "Business Development",
    "Channel Sales",
    "Cold Calling",
    "CRM",
    "Direct Sales",
    "Enterprise Sales",
    "Inbound Sales",
    "Negotiation",
    "Outbound Sales",
    "Sales Analytics",
    "Sales Closing",
    "Sales Enablement",
    "Sales Forecasting",
    "Sales Management",
    "Sales Operations",
    "Sales Process",
    "Sales Strategy",
    "Salesforce",
    "SaaS Sales",
    "Telesales",
  ],
  Writing: [
    "Academic Writing",
    "Blogging",
    "Content Writing",
    "Copywriting",
    "Creative Writing",
    "Editing",
    "Grant Writing",
    "Medical Writing",
    "Newsletters",
    "Press Releases",
    "Proofreading",
    "SEO Writing",
    "Technical Writing",
    "Web Content Writing",
    "Whitepapers",
  ],
};

const transformData = (data) => {
  const transformedData = [];

  for (const category in data) {
    for (const skill of data[category]) {
      transformedData.push({
        value: skill,
        label: `${category}: ${skill}`,
      });
    }
  }

  return transformedData;
};

export default function ComboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const skills = transformData(skillsData);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? skills.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {skills.map((framework) => (
              <CommandItem
                key={framework.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
