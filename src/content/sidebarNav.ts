/**
 * Sidebar look only: groups, short labels and icons.
 * Page addresses (#/guides/<slug>, #/page/..., #/api/...) and page titles are NOT changed here.
 * A guide that is not listed below still appears in the sidebar (in the last group), so nothing can disappear.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Home,
  Zap,
  LayoutGrid,
  FlaskConical,
  Server,
  Code,
  Bell,
  KeyRound,
  CreditCard,
  Info,
  ShoppingCart,
  Check,
  Puzzle,
  Bot,
  HelpCircle,
  History,
  FileText,
  Package,
  Smartphone,
  QrCode,
  Send,
  Globe,
  Monitor,
  RotateCcw,
  ListOrdered,
  BookOpen,
} from 'lucide-react';
import { Language } from '../types/language';

type Label = Record<Language, string>;

export type NavEntry =
  | { kind: 'home'; icon: LucideIcon; label: Label }
  | { kind: 'guide'; slug: string; icon: LucideIcon; label: Label }
  | { kind: 'page'; page: 'plugins'; icon: LucideIcon; label: Label };

export type NavGroup = { id: string; title: Label; items: NavEntry[] };

const ECOM_GROUPS: NavGroup[] = [
  {
    id: 'start',
    title: { ru: 'Начало работы', en: 'Get started', ro: 'Primii pași' },
    items: [
      { kind: 'home', icon: Home, label: { ru: 'Обзор', en: 'Overview', ro: 'Prezentare' } },
      { kind: 'guide', slug: 'getting-started', icon: Zap, label: { ru: 'Первый платёж', en: 'First payment', ro: 'Prima plată' } },
      { kind: 'guide', slug: 'integration-options', icon: LayoutGrid, label: { ru: 'Способы интеграции', en: 'Integration options', ro: 'Moduri de integrare' } },
      { kind: 'guide', slug: 'testing', icon: FlaskConical, label: { ru: 'Тестирование', en: 'Testing', ro: 'Testare' } },
    ],
  },
  {
    id: 'integration',
    title: { ru: 'Интеграция', en: 'Integration', ro: 'Integrare' },
    items: [
      { kind: 'guide', slug: 'server-to-server', icon: Server, label: { ru: 'Server-to-server', en: 'Server-to-server', ro: 'Server-to-server' } },
      { kind: 'guide', slug: 'sdk', icon: Package, label: { ru: 'SDK (PHP, Node.js)', en: 'SDK (PHP, Node.js)', ro: 'SDK (PHP, Node.js)' } },
      { kind: 'guide', slug: 'hosted-checkout', icon: Code, label: { ru: 'Hosted checkout', en: 'Hosted checkout', ro: 'Hosted checkout' } },
      { kind: 'guide', slug: 'mobile-apps', icon: Smartphone, label: { ru: 'Мобильные приложения', en: 'Mobile apps', ro: 'Aplicații mobile' } },
      { kind: 'guide', slug: 'notifications', icon: Bell, label: { ru: 'Уведомления', en: 'Notifications', ro: 'Notificări' } },
      { kind: 'guide', slug: 'signatures', icon: KeyRound, label: { ru: 'Подписи', en: 'Signatures', ro: 'Semnături' } },
      { kind: 'guide', slug: 'saved-cards', icon: CreditCard, label: { ru: 'Сохранённые карты', en: 'Saved cards', ro: 'Carduri salvate' } },
      { kind: 'guide', slug: 'errors-and-statuses', icon: Info, label: { ru: 'Статусы и ошибки', en: 'Statuses and errors', ro: 'Statusuri și erori' } },
      { kind: 'guide', slug: 'example-shop', icon: ShoppingCart, label: { ru: 'Пример магазина', en: 'Example shop', ro: 'Magazin exemplu' } },
      { kind: 'guide', slug: 'go-live', icon: Check, label: { ru: 'Выход в production', en: 'Go live', ro: 'Lansare în producție' } },
    ],
  },
];

export const NAV_COMMON_GROUPS: NavGroup[] = [
  {
    id: 'help',
    title: { ru: 'Справка', en: 'Help', ro: 'Ajutor' },
    items: [
      { kind: 'page', page: 'plugins', icon: Puzzle, label: { ru: 'Плагины', en: 'Plugins', ro: 'Pluginuri' } },
      { kind: 'guide', slug: 'ai-assistants', icon: Bot, label: { ru: 'AI-ассистенты', en: 'AI assistants', ro: 'Asistenți AI' } },
      { kind: 'guide', slug: 'faq', icon: HelpCircle, label: { ru: 'Частые вопросы', en: 'FAQ', ro: 'Întrebări frecvente' } },
      { kind: 'guide', slug: 'changelog', icon: History, label: { ru: 'Изменения', en: 'Changelog', ro: 'Modificări' } },
    ],
  },
];


/** MIA Retail (Paynet Business Retail API). Pages: content/<lang>/mia-retail/NN-mia-*.md, addresses #/mia-retail/<slug>. */
const MIA_RETAIL_GROUPS: NavGroup[] = [
  {
    id: 'mia-start',
    title: { ru: 'Начало работы', en: 'Get started', ro: 'Primii pași' },
    items: [
      { kind: 'guide', slug: 'mia-overview', icon: BookOpen, label: { ru: 'Обзор', en: 'Overview', ro: 'Prezentare' } },
      { kind: 'guide', slug: 'mia-quick-start', icon: Zap, label: { ru: 'Быстрый старт', en: 'Quick start', ro: 'Pornire rapidă' } },
    ],
  },
  {
    id: 'mia-scenarios',
    title: { ru: 'Сценарии', en: 'Scenarios', ro: 'Scenarii' },
    items: [
      { kind: 'guide', slug: 'mia-qr-in-store', icon: QrCode, label: { ru: 'QR на кассе', en: 'QR at the checkout', ro: 'QR la casă' } },
      { kind: 'guide', slug: 'mia-rtp', icon: Send, label: { ru: 'Запрос оплаты RTP', en: 'RTP payment request', ro: 'Cerere de plată RTP' } },
      { kind: 'guide', slug: 'mia-online', icon: Globe, label: { ru: 'Онлайн-оплата', en: 'Online payments', ro: 'Plăți online' } },
    ],
  },
  {
    id: 'mia-integration',
    title: { ru: 'Интеграция', en: 'Integration', ro: 'Integrare' },
    items: [
      { kind: 'guide', slug: 'mia-auth', icon: KeyRound, label: { ru: 'Авторизация', en: 'Authorization', ro: 'Autorizare' } },
      { kind: 'guide', slug: 'mia-pos', icon: Monitor, label: { ru: 'Точки продаж (POS)', en: 'Points of sale (POS)', ro: 'Puncte de vânzare (POS)' } },
      { kind: 'guide', slug: 'mia-callback', icon: Bell, label: { ru: 'Callback', en: 'Callback', ro: 'Callback' } },
      { kind: 'guide', slug: 'mia-statuses-and-errors', icon: Info, label: { ru: 'Статусы и ошибки', en: 'Statuses and errors', ro: 'Statusuri și erori' } },
      { kind: 'guide', slug: 'mia-refunds', icon: RotateCcw, label: { ru: 'Возвраты', en: 'Refunds', ro: 'Returnări' } },
      { kind: 'guide', slug: 'mia-sales-registry', icon: ListOrdered, label: { ru: 'Реестр покупок', en: 'Sales list', ro: 'Registrul vânzărilor' } },
    ],
  },
];

export type NavProduct = { id: 'ecom' | 'mia-retail'; icon: LucideIcon; title: Label; groups: NavGroup[] };

/** Products in the sidebar: collapsible groups (variant B, decision 16.11.2026). Help groups below are shared. */
export const NAV_PRODUCTS: NavProduct[] = [
  { id: 'ecom', icon: CreditCard, title: { ru: 'e-Commerce', en: 'e-Commerce', ro: 'e-Commerce' }, groups: ECOM_GROUPS },
  { id: 'mia-retail', icon: QrCode, title: { ru: 'MIA Retail', en: 'MIA Retail', ro: 'MIA Retail' }, groups: MIA_RETAIL_GROUPS },
];

/** Every group (products + shared), used to find guides that are not listed anywhere. */
export const NAV_GROUPS: NavGroup[] = [...NAV_PRODUCTS.flatMap((product) => product.groups), ...NAV_COMMON_GROUPS];

/** Icon for a guide that is not listed above. */
export const FALLBACK_ICON: LucideIcon = FileText;
