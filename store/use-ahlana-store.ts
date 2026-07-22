"use client";

import { create } from "zustand";
import { activities, bookings, contracts, conversations, users } from "@/mock/data";
import type { CurrencyCode } from "@/lib/currency";
import type { JourneyStep } from "@/lib/journey";
import type { LanguageCode } from "@/lib/i18n";
import type {
  Booking,
  Contract,
  Conversation,
  PackageItemDates,
  PackageSelection,
  QuizAnswers,
  Role,
  User,
} from "@/types";

const emptyQuiz: QuizAnswers = {
  languages: [],
  workshopPreferences: [],
  interests: [],
};

const defaultItemDates: PackageItemDates = {
  activities: {},
};

interface AhlanaState {
  users: User[];
  currentUser: User | null;
  quiz: QuizAnswers;
  onboardingComplete: boolean;
  matchScore: number;
  favorites: string[];
  bookings: Booking[];
  conversations: Conversation[];
  contracts: Contract[];
  packageSelection: PackageSelection;
  journalNotes: string[];
  xp: number;
  theme: "light" | "dark";
  notifications: boolean;
  language: LanguageCode;
  currency: CurrencyCode;
  /** Highest journey step unlocked: 1 package … 7 trip planner */
  journeyUnlocked: JourneyStep;
  signup: (input: { name: string; email: string; password: string; role: Role }) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateQuiz: (answers: Partial<QuizAnswers>) => void;
  finishOnboarding: () => void;
  toggleFavorite: (id: string) => void;
  book: (booking: Omit<Booking, "id" | "status">) => void;
  cancelBooking: (id: string) => void;
  updatePackage: (selection: Partial<PackageSelection>) => void;
  updateItemDates: (dates: Partial<PackageItemDates>) => void;
  clearPackageSchedule: () => void;
  confirmPackage: () => void;
  addMessage: (conversationId: string, text: string, sender?: "me" | "them") => void;
  addJournalNote: (note: string) => void;
  updateProfile: (profile: Partial<Pick<User, "name" | "bio" | "avatar">>) => void;
  setTheme: (theme: "light" | "dark") => void;
  setNotifications: (enabled: boolean) => void;
  setLanguage: (language: LanguageCode) => void;
  setCurrency: (currency: CurrencyCode) => void;
  unlockJourneyStep: (step: JourneyStep) => void;
}

export const useAhlanaStore = create<AhlanaState>((set, get) => ({
  users,
  currentUser: users[0],
  quiz: emptyQuiz,
  onboardingComplete: false,
  matchScore: 0,
  favorites: ["host-2", "host-7"],
  bookings,
  conversations,
  contracts,
  packageSelection: {
    host: "host-2",
    activities: [activities[0].id, activities[4].id],
    startDate: "2026-08-12",
    endDate: "2026-08-19",
    itemDates: { ...defaultItemDates },
    confirmed: false,
  },
  journalNotes: ["Mint tea at sunset with the Benali family — remember the story about the old fig tree."],
  xp: 680,
  theme: "light",
  notifications: true,
  language: "en",
  currency: "DZD",
  journeyUnlocked: 1,
  signup: (input) => {
    if (get().users.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) return false;
    const user: User = {
      ...input,
      id: `user-${Date.now()}`,
      avatar: `https://i.pravatar.cc/200?u=${encodeURIComponent(input.email)}`,
    };
    set((state) => ({ users: [...state.users, user], currentUser: user }));
    return true;
  },
  login: (email, password) => {
    const user = get().users.find(
      (candidate) => candidate.email.toLowerCase() === email.toLowerCase() && candidate.password === password,
    );
    if (!user) return false;
    set({ currentUser: user });
    return true;
  },
  logout: () => set({ currentUser: null }),
  updateQuiz: (answers) => set((state) => ({ quiz: { ...state.quiz, ...answers } })),
  finishOnboarding: () => set({ onboardingComplete: true, matchScore: 91 + Math.floor(Math.random() * 8) }),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((favorite) => favorite !== id)
        : [...state.favorites, id],
    })),
  book: (booking) =>
    set((state) => ({
      bookings: [{ ...booking, id: `booking-${Date.now()}`, status: "Confirmed" }, ...state.bookings],
    })),
  cancelBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Cancelled" as const } : booking,
      ),
    })),
  updatePackage: (selection) =>
    set((state) => ({
      packageSelection: {
        ...state.packageSelection,
        ...selection,
        itemDates: selection.itemDates
          ? {
              ...state.packageSelection.itemDates,
              ...selection.itemDates,
              activities: {
                ...state.packageSelection.itemDates.activities,
                ...(selection.itemDates.activities ?? {}),
              },
            }
          : state.packageSelection.itemDates,
      },
    })),
  updateItemDates: (dates) =>
    set((state) => ({
      packageSelection: {
        ...state.packageSelection,
        itemDates: {
          ...state.packageSelection.itemDates,
          ...dates,
          activities: {
            ...state.packageSelection.itemDates.activities,
            ...(dates.activities ?? {}),
          },
        },
      },
    })),
  clearPackageSchedule: () =>
    set((state) => ({
      packageSelection: {
        ...state.packageSelection,
        startDate: undefined,
        endDate: undefined,
        itemDates: { activities: {} },
      },
    })),
  confirmPackage: () =>
    set((state) => ({
      packageSelection: { ...state.packageSelection, confirmed: true },
      journeyUnlocked: state.journeyUnlocked < 2 ? 2 : state.journeyUnlocked,
    })),
  unlockJourneyStep: (step) =>
    set((state) => ({
      journeyUnlocked: state.journeyUnlocked < step ? step : state.journeyUnlocked,
    })),
  addMessage: (conversationId, text, sender = "me") =>
    set((state) => ({
      conversations: state.conversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [
                ...conversation.messages,
                { id: `message-${Date.now()}`, sender, text, time: "Now" },
              ],
            }
          : conversation,
      ),
    })),
  addJournalNote: (note) =>
    set((state) => ({ journalNotes: [note, ...state.journalNotes], xp: state.xp + 20 })),
  updateProfile: (profile) =>
    set((state) => {
      if (!state.currentUser) return state;
      const currentUser = { ...state.currentUser, ...profile };
      return {
        currentUser,
        users: state.users.map((user) => (user.id === currentUser.id ? currentUser : user)),
      };
    }),
  setTheme: (theme) => set({ theme }),
  setNotifications: (notifications) => set({ notifications }),
  setLanguage: (language) => set({ language }),
  setCurrency: (currency) => set({ currency }),
}));
