export interface NavLinkItem {
  label: string;
  href: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: 'clock' | 'book' | 'chat';
  linkText: string;
  linkHref: string;
}

export interface FeaturedEvent {
  dateTag: string;
  title: string;
  description: string;
  speaker: string;
  ctaText: string;
  ctaHref: string;
}

export interface PrayerTime {
  name: string;
  time: string;
  isNext?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  badge: string;
  icon: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  icon: string;
  featured?: boolean;
}

export interface EventItem {
  id: string;
  dateBadge: string;
  title: string;
  description?: string;
  time?: string;
  location?: string;
  imageUrl: string;
  linkText?: string;
  linkHref?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
  rating?: number;
  featured?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl?: string;
  active?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  featured?: boolean;
}

export interface ContactInfoCard {
  id: string;
  title: string;
  value: string;
  subvalue?: string;
  icon: 'map-pin' | 'phone' | 'mail' | 'clock';
}
