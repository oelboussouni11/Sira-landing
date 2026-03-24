"use client";

import {
  Search,
  CalendarCheck,
  ClipboardList,
  Bell,
  Calendar,
  UserCircle,
  BarChart3,
  MessageCircle,
  FolderOpen,
  ShieldCheck,
  Smartphone,
  Globe,
} from "lucide-react";
import { C } from "@/lib/constants";

const iconMap = {
  search: Search,
  calendar: CalendarCheck,
  clipboard: ClipboardList,
  bell: Bell,
  cal: Calendar,
  user: UserCircle,
  chart: BarChart3,
  msg: MessageCircle,
  folder: FolderOpen,
  shield: ShieldCheck,
  phone: Smartphone,
  globe: Globe,
};

export default function Icon({ name, size = 24, color = C.blue }) {
  const Comp = iconMap[name];
  return Comp ? <Comp size={size} color={color} strokeWidth={1.6} /> : null;
}
