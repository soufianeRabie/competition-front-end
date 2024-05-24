import {
  IconBoxSeam,
  IconChecklist,
  IconLayoutDashboard,
  IconRouteAltLeft,
  IconTruck,
} from "@tabler/icons-react";
import { TimerIcon } from "lucide-react";

export const ADMIN_SIDE_LINKS = [
  {
    title: "dashboard",
    label: "3",
    href: "/home",
    icon: <TimerIcon size={18} />
  },
  {
    title: "intervenants",
    label: "",
    href: "intervenants",
    icon: <TimerIcon size={18} />,
  },

  {
    title: "actions",
    label: "3",
    href: "actions",
    icon: <IconChecklist size={18} />,
  },
  {
    title: "profile",
    label: "",
    href: "profile",
    icon: <TimerIcon size={18} />,
  },
  {
    title: "certifications",
    label: "",
    href: "certifications",
    icon: <TimerIcon size={18} />,
  },
  {
    title: "themes",
    label: "",
    href: "themes",
    icon: <TimerIcon size={18} />,
  },
  {
    title: "competences",
    label: "",
    href: "competences",
    icon: <TimerIcon size={18} />,
  },

  {
    title: "users",
    label: "",
    href: "users",
    icon: <TimerIcon size={18} />,
  },
];

export const ENTREPRISE_SIDE_LINKS = [
  {
    title: "dashboard",
    label: "3",
    href: "/home",
    icon: <TimerIcon size={18} />
  },
  {
    title: "gestion profile",
    label: "",
    href: "profile",
    icon: <TimerIcon size={18} />,
  },
  {
    title: "actions",
    label: "3",
    href: "actions",
    icon: <IconChecklist size={18} />,
  },

]

export const INTERVENANT_SIDE_LINKS = [
  {
    title: "dashboard",
    label: "3",
    href: "/home",
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'actions',
    label: '3',
    href: '/actions',
    icon: <IconChecklist size={18} />,
  },
    {
    title: 'profile',
    label: '',
    href: 'profile',
    icon: <TimerIcon size={18} />,
  },

];
export const LOCAL_SIDE_LINKS = [
  {
    title: "dashboard",
    label: "3",
    href: "/home",
    icon: <IconChecklist size={18} />,
  },
  {
    title: "gestion profile",
    label: "",
    href: "profile",
    icon: <TimerIcon size={18} />,
  },
]
export const REGIONAL_SIDE_LINKS = [
  {
    title: 'dashboard',
    label: '3',
    href: '/home',
    icon: <IconChecklist size={18} />,
  },
  {
    title: "certifications",
    label: "",
    href: "certifications",
    icon: <TimerIcon size={18} />,
  },
  {
    title: "themes",
    label: "",
    href: "themes",
    icon: <TimerIcon size={18} />,
  },
  {
    title: "competences",
    label: "",
    href: "competences",
    icon: <TimerIcon size={18} />,
  },
  {
    title: 'profile',
    label: '',
    href: 'profile',
    icon: <TimerIcon size={18} />,
  },
]
// export const sidelinks = [
//   {}
// ]