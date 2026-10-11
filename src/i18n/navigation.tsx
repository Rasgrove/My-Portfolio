"use client";

import NextLink from 'next/link';
import { usePathname as useNextPathname, useRouter as useNextRouter, useParams } from 'next/navigation';

export function Link({ href, ...rest }: any) {
  const params = useParams();
  const locale = params?.locale || 'es';
  // If it's an absolute path within the app, prefix locale. Otherwise (e.g. hash links or external), let it be.
  const localizedHref = href.startsWith('/') ? `/${locale}${href}` : href;
  
  return <NextLink href={localizedHref} {...rest} />;
}

export const usePathname = useNextPathname;
export const useRouter = useNextRouter;
