import { Vibe } from "@/generated/prisma/enums";
import prisma from "../lib/prisma";

const prisma1 = prisma;

async function main() {
  await prisma1.photo.deleteMany();
  await prisma1.recommendation.deleteMany();
  await prisma1.chat.deleteMany();
  await prisma1.location.deleteMany();
  await prisma1.session.deleteMany();
  await prisma1.account.deleteMany();
  await prisma1.user.deleteMany();

  const user = await prisma1.user.create({
    data: {
      id: "1",
      name: "M",
      email: "m@example.com",
      image:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=M",
    },
  });

  const locations = [
    { id: "wuerzburg", name: "Würzburg, Germany" },
    { id: "prague", name: "Prague, Czech Republic" },
    { id: "vienna", name: "Vienna, Austria" },
    { id: "berlin", name: "Berlin, Germany" },
    { id: "munich", name: "Munich, Germany" },
    { id: "budapest", name: "Budapest, Hungary" },
    { id: "warsaw", name: "Warsaw, Poland" },
    { id: "hamburg", name: "Hamburg, Germany" },
  ];

  for (const loc of locations) {
    await prisma1.location.create({ data: loc });
  }

  const chatHistoryData = [
    {
      sourceLocationId: "wuerzburg",
      createdAt: new Date("2026-03-01"),
    },
    {
      sourceLocationId: "hamburg",
      createdAt: new Date("2026-03-05"),
    },
    {
      sourceLocationId: "berlin",
      createdAt: new Date("2026-03-08"),
    },
    {
      sourceLocationId: "wuerzburg",
      createdAt: new Date("2026-03-01"),
    },
    {
      sourceLocationId: "hamburg",
      createdAt: new Date("2026-03-05"),
    },
    {
      sourceLocationId: "berlin",
      createdAt: new Date("2026-03-08"),
    },
    {
      sourceLocationId: "wuerzburg",
      createdAt: new Date("2026-03-01"),
    },
    {
      sourceLocationId: "hamburg",
      createdAt: new Date("2026-03-05"),
    },
    {
      sourceLocationId: "berlin",
      createdAt: new Date("2026-03-08"),
    },
    {
      sourceLocationId: "wuerzburg",
      createdAt: new Date("2026-03-01"),
    },
    {
      sourceLocationId: "hamburg",
      createdAt: new Date("2026-03-05"),
    },
    {
      sourceLocationId: "berlin",
      createdAt: new Date("2026-03-08"),
    },
    {
      sourceLocationId: "wuerzburg",
      createdAt: new Date("2026-03-01"),
    },
    {
      sourceLocationId: "hamburg",
      createdAt: new Date("2026-03-05"),
    },
    {
      sourceLocationId: "berlin",
      createdAt: new Date("2026-03-08"),
    },
    {
      sourceLocationId: "wuerzburg",
      createdAt: new Date("2026-03-01"),
    },
    {
      sourceLocationId: "hamburg",
      createdAt: new Date("2026-03-05"),
    },
    {
      sourceLocationId: "berlin",
      createdAt: new Date("2026-03-08"),
    },
    {
      sourceLocationId: "wuerzburg",
      createdAt: new Date("2026-03-01"),
    },
    {
      sourceLocationId: "hamburg",
      createdAt: new Date("2026-03-05"),
    },
    {
      sourceLocationId: "berlin",
      createdAt: new Date("2026-03-08"),
    },
    {
      sourceLocationId: "wuerzburg",
      createdAt: new Date("2026-03-01"),
    },
    {
      sourceLocationId: "hamburg",
      createdAt: new Date("2026-03-05"),
    },
    {
      sourceLocationId: "berlin",
      createdAt: new Date("2026-03-08"),
    },
  ];

  for (const chatData of chatHistoryData) {
    await prisma1.chat.create({
      data: {
        ...chatData,
        userId: user.id,
      },
    });
  }

  const activeChat = await prisma1.chat.create({
    data: {
      chatId: "active_chat_id",
      sourceLocationId: "wuerzburg",
      userId: user.id,
    },
  });

  const recommendations = [
    {
      locationId: "prague",
      vibe: [Vibe.history, Vibe.partying],
      score: 98,
      isFavorite: true,
      description:
        "Prague is a gothic wonderland that perfectly balances medieval charm with a vibrant modern soul.",
    },
    {
      locationId: "vienna",
      vibe: [Vibe.culture, Vibe.family],
      score: 85,
      isFavorite: false,
      description:
        "The imperial capital of Austria, where every street corner feels like a museum visit.",
    },
    {
      locationId: "budapest",
      vibe: [Vibe.history, Vibe.nature, Vibe.partying],
      score: 92,
      isFavorite: true,
      description:
        "Known as the Paris of the East, famous for its thermal baths and stunning river views.",
    },
    {
      locationId: "munich",
      vibe: [Vibe.nature, Vibe.shopping],
      score: 75,
      isFavorite: false,
      description:
        "Bavarian tradition meets high-end lifestyle near the edge of the Alps.",
    },
  ];

  for (const rec of recommendations) {
    await prisma1.recommendation.create({
      data: {
        ...rec,
        userId: user.id,
        chatId: activeChat.chatId,
        sourceLocationId: activeChat.sourceLocationId,
        vibeDescription:
          "The overall atmosphere is unique and captivating.",
        citySizeDescription:
          "Medium to large city with great walkability.",
        timingDescription:
          "A stay of 2-3 days is recommended.",
        practicalTips:
          "Carry some local currency and book attractions in advance.",
      },
    });
  }

  await prisma1.photo.createMany({
    data: [
      {
        locationId: "prague",
        url: "https://images.unsplash.com/photo-1513807016779-d51c0c026263",
        alt: "Charles Bridge",
      },
      {
        locationId: "vienna",
        url: "https://images.unsplash.com/photo-1516550893923-42d28e5677af",
        alt: "Vienna Opera",
      },
      {
        locationId: "budapest",
        url: "https://images.unsplash.com/photo-1551867633-194f125bddfa",
        alt: "Parliament",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma1.$disconnect();
  });
