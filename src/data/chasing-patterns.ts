export interface ChasingPattern {
  slug: string;
  name: string;
  oneLiner: string;
  color: string;
  textColor: string;
  pullquote: string;
  metaTitle: string;
  metaDescription: string;
  whatThisLooksLike: string[];
  whatItsUsuallyAbout: string[];
  whatHelps: string[];
}

export const CHASING_PATTERNS: ChasingPattern[] = [
  {
    slug: "moonbeams",
    name: "Moonbeams",
    oneLiner:
      "You spend to soothe something. The purchase is a hug in disguise.",
    color: "#E0DAE7",
    textColor: "#493751",
    pullquote:
      "The cart fills fastest when the body is running on empty.",
    metaTitle: "Moonbeams Chasing Pattern | No Spend Collective",
    metaDescription:
      "Moonbeams is the spending pattern that soothes. Learn how comfort-driven purchases work and what to notice instead.",
    whatThisLooksLike: [
      "You had a long day and now there are three tabs open. Nothing in the cart costs more than $30. Everything in the cart feels soft, warm, or small enough to justify. You are not shopping for a thing. You are shopping for a feeling. The purchase is a proxy for rest, comfort, or safety you are not getting somewhere else.",
      "It often shows up after conflict, after exhaustion, after a day where you held it together for everyone else. The spending is quiet. It does not look reckless. It looks like candles, skincare, cozy socks, a weighted blanket, a new tea blend. Each item makes sense on its own. The pattern only becomes visible in the aggregate.",
      "Sometimes it is not even a purchase. It is browsing. The scroll itself is the soothing behavior. Adding things to a wishlist. Reading reviews. The ritual of choosing feels like care, even before anything ships.",
    ],
    whatItsUsuallyAbout: [
      "Moonbeams spending is comfort-seeking behavior. The nervous system is looking for regulation, and purchasing something small and pleasant provides a brief hit of it. The brain reads the act of choosing something nice for yourself as self-care, even when the thing itself is not what you actually need.",
      "Underneath, there is usually depletion. Physical tiredness, emotional overload, or a stretch of time where your own needs came last. The spending is trying to put something back. It is not about the object. It is about the gesture of giving yourself something.",
    ],
    whatHelps: [
      "Notice the body state before you open a shopping app. Tired, tense, and understimulated is the trifecta for Moonbeams spending.",
      "The pattern weakens when rest is not earned but scheduled. Comfort that does not cost anything still counts.",
      "Keep a list of what you almost bought. After a week, look at what the items had in common. That is what you were actually looking for.",
      "A 20-minute pause between the urge and the purchase changes the outcome more often than willpower does.",
    ],
  },
  {
    slug: "rainbows",
    name: "Rainbows",
    oneLiner:
      "You buy the version of life that would exist if only this one thing arrived.",
    color: "#B375A0",
    textColor: "#FAFAF0",
    pullquote:
      "The purchase is not about having. It is about becoming.",
    metaTitle: "Rainbows Chasing Pattern | No Spend Collective",
    metaDescription:
      "Rainbows is the spending pattern built on aspiration. Learn how future-self purchases work and what to notice instead.",
    whatThisLooksLike: [
      "You buy the running shoes before the running habit exists. You order the linen apron for the kitchen you are going to keep clean this time. The purchase is a deposit on a future self. It feels productive because it is attached to a plan, even if the plan is mostly a feeling.",
      "Rainbows spending often follows inspiration. You watched a video, read an article, saw someone else's life and thought: that could be me. The gap between where you are and where you want to be narrows for a moment when you buy the thing that belongs in the other life.",
      "The closet, the garage, the junk drawer all hold evidence. Yoga mats still rolled. Journals with two entries. A sous vide machine used once. These are not failures. They are breadcrumbs showing you what you were hoping for at the time.",
    ],
    whatItsUsuallyAbout: [
      "Rainbows spending is identity work. The purchase is a rehearsal for who you want to become. Buying the thing feels like a first step, and sometimes it is. But when the pattern repeats, the buying becomes the step, and the doing never quite follows.",
      "There is often a gap between current reality and desired reality that feels hard to close with action alone. The object becomes a bridge. It says: I am the kind of person who owns this. For a moment, that feels true.",
    ],
    whatHelps: [
      "Before buying, ask: am I purchasing a tool or purchasing an identity? Tools get used. Identities get stored.",
      "Try borrowing, renting, or using a free version for two weeks first. If the habit sticks without the purchase, the purchase will actually get used.",
      "Write down the life you are imagining when you add something to your cart. Sometimes seeing it on paper is enough.",
      "Notice which purchases you have made in the past that followed this pattern. Gratitude is not the point. Data is.",
    ],
  },
  {
    slug: "ambrosia",
    name: "Ambrosia",
    oneLiner:
      "You chase the feeling of abundance. The experience is the point, not the object.",
    color: "#E8B4A0",
    textColor: "#493751",
    pullquote:
      "Abundance is the feeling. The spending is just the delivery method.",
    metaTitle: "Ambrosia Chasing Pattern | No Spend Collective",
    metaDescription:
      "Ambrosia is the spending pattern that chases abundance and experience. Learn how sensory-driven purchases work and what to notice instead.",
    whatThisLooksLike: [
      "The grocery cart has six kinds of cheese. The takeout order feeds four even though you live alone. The vacation itinerary has no blank space. You are not being irresponsible. You are building an experience. The richness of the moment matters more to you than the line item.",
      "Ambrosia spending often centers on food, travel, hospitality, and gatherings. You are the one who hosts, who brings the good wine, who insists on the nicer restaurant. Generosity is part of the pattern, but so is the need for the experience to feel full.",
      "Scarcity is the trigger. Real scarcity from earlier in life, or the low-grade scarcity of a busy week where everything felt thin and rushed. The spending is an antidote. It says: there is enough. Look at all of this. We are fine.",
    ],
    whatItsUsuallyAbout: [
      "Ambrosia spending is about sensory proof of safety. When life feels scarce or constrained, abundance becomes medicine. The experience of plenty, whether it is a loaded table or a spontaneous trip, regulates something that budgeting alone cannot touch.",
      "There is often a history of not-enough somewhere in the background. Financial instability, emotional scarcity, or a childhood where treats were rare. The spending is reparative. It is trying to fill a real gap. The question is whether this particular purchase is the most effective way to do that.",
    ],
    whatHelps: [
      "Track how you feel 48 hours after a big experience-based purchase. The glow fades at a predictable rate. Knowing the rate helps.",
      "Abundance can be created without spending. A meal made slowly with what you have. A walk with nowhere to be. The feeling is available for free more often than the pattern suggests.",
      "Notice the difference between generous and compulsive. Generous feels warm before and after. Compulsive feels urgent before and hollow after.",
      "Plan one experience per week that feels rich and costs nothing. See what happens to the urge.",
    ],
  },
  {
    slug: "stardust",
    name: "Stardust",
    oneLiner:
      "You spend to feel connected or like someone. The item means belonging.",
    color: "#A6C9BB",
    textColor: "#493751",
    pullquote:
      "The purchase is a membership card to a group that never asked for dues.",
    metaTitle: "Stardust Chasing Pattern | No Spend Collective",
    metaDescription:
      "Stardust is the spending pattern rooted in belonging. Learn how connection-driven purchases work and what to notice instead.",
    whatThisLooksLike: [
      "Your friend has it, so now you want it. Not because you need it, but because owning it puts you in the same world. The purchase is social glue. It says: I belong here. I get the reference. I am part of this.",
      "Stardust spending shows up around trends, group activities, and social media. A new hobby because your friend group picked it up. Matching gear for a trip. The right brand for the right crowd. Each purchase makes sense in context. The pattern becomes visible when the context keeps changing.",
      "It also shows up in gift-giving. Overspending on presents. Saying yes to group dinners you cannot afford. Picking up the check to stay in good standing. The spending is relational. It is the cost of keeping connection alive, or at least feeling like it.",
    ],
    whatItsUsuallyAbout: [
      "Stardust spending is belonging behavior. The item is a token of membership. Owning it, wearing it, or participating in the experience signals that you are part of the group. Opting out feels like risking the connection.",
      "There is usually a fear of being on the outside. Not dramatic exclusion, but the quiet drift that happens when you stop keeping up. The spending maintains proximity. It is less about the thing and more about what the thing represents in the relationship.",
    ],
    whatHelps: [
      "Ask which friendships would survive a no. The ones that would are the ones worth investing in. The ones that would not are the ones driving the spending.",
      "Notice when you buy something because you saw someone else with it. That is not a need. That is a mirror.",
      "Belonging that depends on matching purchases is expensive and fragile. Belonging that depends on showing up is free and durable.",
      "Try saying 'that looks great on you' without adding it to your own cart. The admiration can exist on its own.",
    ],
  },
  {
    slug: "sunshine",
    name: "Sunshine",
    oneLiner:
      "You spend as celebration. You earned it, you deserve it, this one counts.",
    color: "#E8B4A0",
    textColor: "#493751",
    pullquote:
      "The reward is real. The question is whether the purchase is the best version of it.",
    metaTitle: "Sunshine Chasing Pattern | No Spend Collective",
    metaDescription:
      "Sunshine is the spending pattern that celebrates. Learn how reward-based purchases work and what to notice instead.",
    whatThisLooksLike: [
      "You finished the project. You survived the week. You hit the goal. Now it is time to treat yourself. The spending feels justified because something preceded it. There is a story that makes the purchase make sense: I worked hard, and hard work should be rewarded.",
      "Sunshine spending often follows effort, deprivation, or discipline. You were good all week, so Friday is a free pass. You saved money last month, so this month you can loosen up. The pattern runs on a cycle of restriction and release. One funds the other.",
      "It also appears around milestones. Birthdays, promotions, anniversaries, even small wins like cleaning the apartment. The celebration is real. The question is whether every celebration needs a transaction attached to it.",
    ],
    whatItsUsuallyAbout: [
      "Sunshine spending is reward circuitry. The brain links effort to payout, and spending becomes the default form of payout. Over time, the threshold lowers. Smaller efforts justify larger rewards. The pattern is self-reinforcing because the spending itself feels earned.",
      "Underneath, there is sometimes a belief that pleasure must be justified. Rest, enjoyment, and ease are only allowed after they have been earned. The spending is the permission slip. Without the purchase, the celebration does not feel real.",
    ],
    whatHelps: [
      "Notice the difference between celebrating and compensating. Celebrating feels proportional. Compensating feels urgent.",
      "Experiment with rewards that are not purchases. An afternoon off. A long bath. A phone call to someone you like. The reward still lands.",
      "Track how often 'I deserve this' appears in your internal monologue while shopping. Frequency reveals pattern.",
      "The permission to enjoy something does not require a receipt. That belief is worth examining.",
    ],
  },
  {
    slug: "unicorns",
    name: "Unicorns",
    oneLiner:
      "You are still looking for the perfect version. One more tab. One more search.",
    color: "#493751",
    textColor: "#FAFAF0",
    pullquote:
      "Perfect is not a product. It is a search that never has to end.",
    metaTitle: "Unicorns Chasing Pattern | No Spend Collective",
    metaDescription:
      "Unicorns is the spending pattern that optimizes endlessly. Learn how perfectionist purchasing works and what to notice instead.",
    whatThisLooksLike: [
      "You have read every review. You have compared four versions. You returned two and ordered a third. The right one is out there. You just have not found it yet. The search is meticulous, thorough, and never quite done.",
      "Unicorns spending looks responsible on the surface. You are researching. You are being careful. You are not impulse buying. But the hours spent, the tabs open, the returns processed, and the mental energy consumed tell a different story. The cost is not always in the price tag. Sometimes it is in the attention.",
      "It also shows up as delayed purchasing that eventually costs more. Waiting for the best deal, missing it, then paying full price anyway. Buying the budget version, being unsatisfied, and replacing it with the expensive one. The pursuit of perfect becomes more expensive than good enough would have been.",
    ],
    whatItsUsuallyAbout: [
      "Unicorns spending is control behavior. The research phase feels safe because no commitment has been made. As long as you are still looking, you have not chosen wrong. The search itself becomes the comfort zone.",
      "There is often a fear of regret underneath. Choosing the wrong thing feels like a personal failure, so the decision gets delayed, revisited, and optimized past the point of usefulness. The pattern is less about finding the best and more about avoiding the feeling of having chosen badly.",
    ],
    whatHelps: [
      "Set a research timer. Thirty minutes of comparison is useful. Three hours is the pattern talking.",
      "Good enough, purchased once, beats perfect, purchased three times. Run the math on your last five returns.",
      "Notice when the search itself starts to feel satisfying. That is the moment the behavior has become its own reward.",
      "The discomfort of choosing 'wrong' fades in about 72 hours. The discomfort of never choosing does not fade at all.",
    ],
  },
];

export function getPatternBySlug(slug: string): ChasingPattern | undefined {
  return CHASING_PATTERNS.find((p) => p.slug === slug);
}
