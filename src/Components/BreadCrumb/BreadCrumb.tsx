import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { LucideIcon } from "lucide-react";
import { Fragment, ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  title: string;
  description?: string;
  icon: LucideIcon;
  logo?: ReactNode;  
  gradient?: string;
  iconBg?: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({title,description,icon: Icon,logo,gradient,iconBg,breadcrumbs}: Props) {
  return (
    <div className={`bg-linear-to-br ${gradient}`}>
      <div className="container mx-auto py-10 px-4 sm:py-14">
        <Breadcrumb className="mb-6">
          <BreadcrumbList className="text-white">
            {breadcrumbs.map((item, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink href={item.href} className="hover:text-gray-300 text-sm">
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="text-gray-300 text-sm font-medium">
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center">
          <div className={`mr-4 p-2 flex items-center justify-center ${iconBg} rounded-lg w-16 h-16 shadow-lg`}>
            {logo ? logo : <Icon className="w-8 h-8 text-white" />}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{title}</h1>
            {description && (
              <p className="text-white text-sm">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}