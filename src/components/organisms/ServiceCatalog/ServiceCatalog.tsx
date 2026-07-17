import type { ReactNode } from "react";

import { ServiceCard } from "@/components/molecules/ServiceCard";
import type { ServiceCatalogProps } from "@/types/serviceCatalog";

import styles from "./ServiceCatalog.module.scss";

export function ServiceCatalog({ services }: ServiceCatalogProps): ReactNode {
  if (services.length === 0) {
    return null;
  }

  return (
    <section className={styles.catalog} aria-label="Our services">
      <div className={styles.grid}>
        {services.map((service, index) => (
          <ServiceCard
            key={service.slug}
            title={service.title}
            description={service.description}
            image={service.image}
            imageAlt={service.imageAlt}
            icon={service.icon}
            features={service.features}
            ctaLabel={service.ctaLabel}
            ctaHref={service.ctaHref}
            detailHref={`/services/${service.slug}`}
            priority={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
