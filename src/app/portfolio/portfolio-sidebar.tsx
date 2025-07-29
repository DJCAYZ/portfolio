import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import { courses } from "@/lib/data";
import { toProperCase } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function PortfolioSidebar() {
  const items = (Object.keys(courses) as Array<keyof typeof courses>).map((key) => {
    const course = courses[key];

    return {
      title: `${course.shortCode} - ${course.section}`,
      url: `/portfolio/${key}`,
      subItems: course.terms?.map(term => ({
        title: toProperCase(term),
        url: `/portfolio/${key}/${term}`,
      })),
    };
  });

  return (
    <Sidebar className="">
      <SidebarMenu>
        <SidebarHeader>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <ArrowLeft />
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/portfolio'>Portfolio Index</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/portfolio/submission'>All Submissions</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>{item.title}</Link>
              </SidebarMenuButton>

              <SidebarMenuSub>
                {item.subItems?.map((subItem, sIndex) => (
                  <SidebarMenuSubItem key={sIndex}>
                    <SidebarMenuSubButton asChild>
                      <Link href={subItem.url}>{subItem.title}</Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenuItem>
          ))}
        </SidebarContent>
      </SidebarMenu>
    </Sidebar>
  )
}