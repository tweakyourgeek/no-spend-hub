# Lead Magnets: Complete Implementation Guide

## Document Purpose
This document provides complete implementation details for all lead magnets in the No-Spend Challenge ecosystem, including setup instructions, delivery mechanisms, email sequences, and conversion funnels.

---

## Table of Contents
1. [Lead Magnet Strategy Overview](#lead-magnet-strategy-overview)
2. [B2C Lead Magnets](#b2c-lead-magnets)
3. [B2B Lead Magnets](#b2b-lead-magnets)
4. [Implementation Checklist](#implementation-checklist)
5. [Tracking & Metrics](#tracking--metrics)

---

## Lead Magnet Strategy Overview

### Purpose and Goals

**Lead Magnet Goals**:
1. ✅ Build email list (bundle participation, landing pages)
2. ✅ Demonstrate value before asking for purchase
3. ✅ Segment audience (B2C vs B2B)
4. ✅ Warm up cold traffic
5. ✅ Drive to Skool Standard tier

### What Makes a Good Lead Magnet

**Criteria**:
- ✅ Immediately actionable (30 minutes or less to use)
- ✅ Specific problem solved
- ✅ Quick win
- ✅ Related to paid products (natural upgrade path)
- ✅ High perceived value

### Value Ladder

**Free vs Lead Magnet vs Paid**:

| Tier | Type | Example | Email Required? |
|------|------|---------|-----------------|
| **Standard** | Public content | Quarterly challenges, blog posts, social content | No |
| **LEAD MAGNET** | Email opt-in | Spreadsheets, templates, quizzes | Yes |
| **Premium** | Purchase | The No-Spend Guide, courses, VIP tier | Yes |

---

## B2C Lead Magnets

### 1. My Cash Envelope System

**Type**: Google Sheets template
**Platform**: Google Sheets (requires Google account)
**Target Audience**: Personal finance beginners, cash envelope method users, household budget managers

#### What's Included

**Features**:
- Multiple savings envelope/goal categories
- Track money in/out of each category
- Visual progress tracking
- Works on any device with Google account

**Setup Categories** (Examples):
- Vacation fund
- Emergency fund
- Holiday gifts
- Home repairs
- Car maintenance
- Fun money

#### Delivery Setup

**Technical Implementation**:

1. **Create Master Template**:
   - Build Google Sheet with protected formula cells
   - Set up sharing settings: "Anyone with link can view"
   - Create "Make a Copy" instructions

2. **Landing Page Requirements**:
   - Headline: "Your Digital Cash Envelope System (FREE)"
   - Email opt-in form
   - Immediate delivery promise
   - Thumbnail preview of spreadsheet

3. **Delivery Email** (Day 0):
   ```
   Subject: Your Cash Envelope System is ready! ✓
   Preview: "Open to get your Google Sheets template + setup instructions..."

   Hi {{first_name}},

   Your Cash Envelope System is ready!

   → Click here to access your template: [LINK]

   Quick Setup (3 minutes):
   1. Click the link above
   2. Go to File → Make a Copy
   3. Rename categories to match your savings goals
   4. Start tracking!

   Not sure what categories to create? Check out this guide: [LINK TO SETUP ARTICLE]

   Tomorrow I'll send you tips for using this digitally (no cash required).

   [Signature]
   ```

#### Email Nurture Sequence

**5 Emails over 10 Days**:

**Email 1 (Day 2): Tips for Using Cash Envelopes Digitally**
```
Subject: How to use cash envelopes without cash
Preview: "3 ways to make digital envelopes work for real life..."

Hi {{first_name}},

You don't need actual cash to use the envelope method.

Here's how to make it work digitally:

1. Link each envelope to a specific savings account or sub-account
2. Use your spreadsheet as the tracker, bank as the holder
3. Move money between accounts when you "fill" envelopes

Pro tip: Many banks let you create sub-accounts or "buckets" for free.

Need help setting this up? Reply and let me know what bank you use.

[Signature]
```

**Email 2 (Day 5): Common Mistakes to Avoid**
```
Subject: 3 mistakes people make with cash envelopes
Preview: "Avoid these and your system will actually work..."

Hi {{first_name}},

I see these mistakes all the time:

❌ Mistake 1: Creating too many envelopes
→ Start with 3-5 max. You can always add more later.

❌ Mistake 2: Moving money between envelopes constantly
→ Set rules for when this is allowed (emergencies only, or once per month).

❌ Mistake 3: Not celebrating progress
→ Watch those numbers grow! It's motivating.

Your envelope system should feel simple, not stressful.

[Signature]
```

**Email 3 (Day 7): Want More? Join FREE Skool Community**
```
Subject: Join the No Spend Collective (FREE)
Preview: "Get ongoing support, challenges, and templates..."

Hi {{first_name}},

You're using the Cash Envelope System.
Want more support?

Join The No Spend Collective (Standard tier):

✓ Quarterly challenges (No-Spend Challenge, Pantry Challenge, etc.)
✓ Community support
✓ Monthly check-in prompts
✓ Free worksheets and templates

It's free. No credit card required.

→ Join here: [SKOOL LINK]

[Signature]
```

**Email 4 (Day 10): No-Spend Challenge Invitation**
```
Subject: Ready for a bigger challenge?
Preview: "30 days to understand your spending patterns..."

Hi {{first_name}},

You're tracking your savings.
Want to understand your spending?

The 30-Day No-Spend Challenge helps you:
- Identify WHY you spend (not just what you spend on)
- Break autopilot shopping habits
- Use what you already have
- Build better money patterns

You can't do it wrong.
Spending during the challenge = data, not failure.

Get the guide: [LINK TO $30 GUIDE]
Use code NOSPEND50 for 50% off ($15)

Or join the Standard Skool community and start the next quarterly challenge.

[Signature]
```

#### Conversion Goals

**Primary Goal**: Standard Skool tier signup
**Secondary Goal**: $30 standalone guide purchase (with NOSPEND50 code)
**Long-term Goal**: Eventually Premium tier conversion ($9/mo)

**Expected Conversion Rates**:
- Email opens: 40-50%
- Skool signups: 10-15%
- Guide purchases: 2-5%

#### Bundle Use

**January 2026 "Kickoff Bundle" (Griffin)**:
- Product type: FREE bundle
- Expected downloads: High (thousands)
- CTA: Join Standard Skool tier
- Special offer: Founding member rates if they upgrade

---

### 2. Pattern Quiz

**Type**: Interactive quiz/assessment
**Platform**: TypeForm, Google Forms, or Interact Quiz Builder
**Target Audience**: Anyone who shops emotionally or impulsively

#### What's Included

**Quiz Structure** (15-20 questions):

**Sample Questions**:
1. "When I'm stressed, I tend to..."
   - [ ] Research solutions online
   - [ ] Browse favorite stores
   - [ ] Buy something to feel better
   - [ ] Ignore it and distract myself

2. "I buy things because..."
   - [ ] They might be useful someday
   - [ ] They're on sale and I can't pass up the deal
   - [ ] I'll finally be organized/productive/successful
   - [ ] I deserve a treat

3. "My shopping habits are worst when..."
   - [ ] I'm bored
   - [ ] I'm comparing myself to others
   - [ ] I'm avoiding a task
   - [ ] I'm feeling behind or inadequate

**Scoring**: Each answer maps to one of the 6 Chasing Patterns

**Results Delivered**:
- Pattern identification: "Your dominant pattern is: **Rainbows**"
- Pattern explanation PDF (3-4 pages)
- Pattern-specific intervention tips
- Invitation to 30-day challenge

#### The 6 Chasing Patterns

| Pattern | What They Chase | Shopping Behavior | Sample Trigger |
|---------|-----------------|-------------------|----------------|
| **Ambrosia** | Regulation/calm | Buying to feel better | Stress, overwhelm, chaos |
| **Rainbows** | Future potential | Buying for "someday" | Research spirals, FOMO |
| **Unicorns** | The ideal/perfection | Buying the "right" thing | Comparison, inadequacy |
| **Stardust** | Identity/legitimacy | Buying to become someone | Imposter syndrome, visibility |
| **Sunshine** | Mood/treat | Buying to feel happy | "I earned this" thinking |
| **Moonbeams** | Fantasy/longing | Buying the dream | Vague aspirations, escape |

#### Delivery Setup

**Technical Implementation**:

1. **Quiz Platform Setup**:
   - Build quiz in TypeForm or similar
   - Create 6 different result pages (one per pattern)
   - Set up email collection before results
   - Configure email delivery with pattern PDF

2. **Landing Page**:
   ```
   Headline: What's Your Spending Pattern?

   Subheadline: Take this 5-minute quiz to discover WHY you shop
   (and what to do about it)

   [START QUIZ BUTTON]

   What you'll get:
   ✓ Your dominant spending pattern
   ✓ Pattern explanation PDF
   ✓ Pattern-specific tips
   ✓ Invitation to 30-day challenge
   ```

3. **Result PDFs** (Create 6):
   - **Page 1**: Pattern name and description
   - **Page 2**: How this pattern shows up in spending
   - **Page 3**: Pattern-specific intervention strategies
   - **Page 4**: Next steps (join challenge)

#### Email Nurture Sequence

**Pattern-Based Sequence** (7 emails over 14 days):

**Email 1 (Day 0): Results Delivery**
```
Subject: Your spending pattern: {{pattern_name}}
Preview: "You're chasing {{pattern_name}}. Here's what that means..."

Hi {{first_name}},

You took the pattern quiz.
Your dominant pattern is: **{{pattern_name}}**

→ Download your pattern report: [LINK TO PDF]

This pattern isn't bad or wrong.
It's just information.

Read your report and we'll talk more tomorrow.

[Signature]
```

**Email 2 (Day 2): Pattern Deep Dive**
```
Subject: Why you chase {{pattern_name}}
Preview: "This pattern serves a protective function..."

Hi {{first_name}},

{{Pattern_name}} spending isn't random.

It serves a purpose:
- {{Purpose specific to pattern}}
- {{Function specific to pattern}}

The pattern isn't the problem.
The pattern is trying to solve a problem.

Tomorrow: What to do instead of shopping.

[Signature]
```

**Email 3 (Day 5): Pattern-Specific Tips**
```
Subject: 3 alternatives to {{pattern_name}} spending
Preview: "Try these when the urge hits..."

Hi {{first_name}},

When you feel the {{pattern_name}} urge, try this:

{{Pattern-specific tip 1}}
{{Pattern-specific tip 2}}
{{Pattern-specific tip 3}}

The goal isn't to stop wanting.
The goal is to have options.

[Signature]
```

**Email 4 (Day 7): Social Proof**
```
Subject: You're not the only {{pattern_name}} chaser
Preview: "Here's what others with your pattern say..."

Hi {{first_name}},

"I thought I was the only one who {{pattern-specific behavior}}."

You're not.

{{Pattern_name}} is one of the most common patterns I see.

Here's what others with this pattern have learned:
[Pattern-specific testimonial or story]

[Signature]
```

**Email 5 (Day 10): Challenge Invitation**
```
Subject: Ready to interrupt the {{pattern_name}} pattern?
Preview: "30 days to understand your triggers..."

Hi {{first_name}},

You know your pattern.
Want to change it?

The 30-Day No-Spend Challenge helps you:
- Identify specific triggers
- Practice alternatives
- Build new patterns
- Learn from the data

Your pattern shows up in the challenge.
Here's how: {{Pattern-specific preview}}

Get the guide: [LINK]
Use code NOSPEND50 for 50% off

[Signature]
```

#### Conversion Goals

**Primary Goal**: $30 standalone guide purchase (with NOSPEND50 code)
**Secondary Goal**: $9/mo Skool Premium tier signup
**Long-term Goal**: VIP tier ($99/yr) for pattern-specific GPTs

---

### 3. Comfort Menu Starter

**Type**: PDF template + examples
**Platform**: PDF download
**Target Audience**: Emotional spenders, stress shoppers, "retail therapy" users

#### What's Included

**Component 1: Blank Comfort Menu Template**
- Fillable PDF with categories
- Space for 50+ activities
- Instructions for customization

**Component 2: Pre-Filled Examples** (50+ ideas by category):

**5-Minute Resets**:
- Wash your face with cold water
- Step outside for fresh air
- Make tea or coffee
- Stretch for 5 minutes
- Listen to one favorite song
- Call a friend (just to say hi)

**Sensory Comfort**:
- Light a candle you already have
- Take a hot shower
- Use your favorite lotion
- Put on cozy socks
- Sit in sunshine
- Pet an animal

**Movement**:
- Walk around the block
- Dance to one song
- Do 10 jumping jacks
- Yoga (5-10 minutes)
- Clean one small area

**Connection**:
- Text someone you love
- Hug a family member
- Video call a friend
- Join online community
- Send a voice message

**Creative Outlets**:
- Doodle or color
- Rearrange a shelf
- Take photos
- Write in a journal
- Use supplies you already have

**Component 3: Customization Guide**
- How to identify what soothes you
- How to match menu items to different moods
- How to keep your menu accessible
- How to update it seasonally

#### Delivery Setup

**Technical Implementation**:

1. **Create PDF** (5-7 pages):
   - **Page 1**: Cover + instructions
   - **Page 2**: Blank template (fillable)
   - **Pages 3-5**: Pre-filled examples by category
   - **Page 6**: Customization guide
   - **Page 7**: Next steps (join challenge)

2. **Landing Page**:
   ```
   Headline: Your Comfort Menu (No Shopping Required)

   Subheadline: 50+ ways to feel better without spending money

   What you'll get:
   ✓ Blank comfort menu template
   ✓ 50+ pre-filled ideas
   ✓ Customization guide

   Use this when you want to shop to feel better.

   [GET YOUR FREE MENU]
   ```

3. **Delivery Email** (Day 0):
   ```
   Subject: Your Comfort Menu is ready
   Preview: "50+ non-spending alternatives when you need comfort..."

   Hi {{first_name}},

   Here's your Comfort Menu: [DOWNLOAD LINK]

   How to use it:
   1. Print it or save to your phone
   2. When you want to shop to feel better, check your menu first
   3. Pick ONE thing from the list
   4. Try it for 5 minutes

   You might still shop after.
   That's okay.

   The menu gives you options.

   Tomorrow: How to customize this for your life.

   [Signature]
   ```

#### Email Nurture Sequence

**4 Emails over 10 Days**:

**Email 1 (Day 3): How to Customize Your Menu**
```
Subject: 3 ways to customize your comfort menu
Preview: "Make it work for YOUR life..."

Hi {{first_name}},

Your comfort menu should be personal.

Here's how to customize it:

1. **Add your go-to comforts**
   What actually soothes you? Add those.

2. **Remove what doesn't work**
   If "meditate" makes you roll your eyes, delete it.

3. **Match menu items to moods**
   Stressed? → Movement
   Sad? → Connection
   Bored? → Creative outlet

Your menu, your rules.

[Signature]
```

**Email 2 (Day 6): Comfort Menu in Action**
```
Subject: Real examples of comfort menus in use
Preview: "Here's what it looks like in real life..."

Hi {{first_name}},

Real scenario: You had a hard day and want to "treat yourself" to Target.

Instead, you check your comfort menu:

Option 1: Put on cozy clothes and light a candle
Option 2: Call your friend for 10 minutes
Option 3: Take a hot shower and use fancy lotion

You pick Option 3.
Maybe you still go to Target after.
Maybe you don't.

Either way, you gave yourself options.

[Signature]
```

**Email 3 (Day 8): Keep Your Menu Accessible**
```
Subject: Where to keep your comfort menu
Preview: "Make it easy to find when you need it..."

Hi {{first_name}},

Your comfort menu only works if you can find it.

Keep it:
- On your phone (screenshot or PDF)
- On your fridge
- In your wallet
- As your lock screen

The easier it is to access, the more you'll use it.

[Signature]
```

**Email 4 (Day 10): Want Daily Support?**
```
Subject: Join the challenge for daily comfort support
Preview: "Daily prompts + community + accountability..."

Hi {{first_name}},

You have a comfort menu.
Want daily support using it?

The No-Spend Challenge includes:
- Daily prompts to practice non-spending comfort
- Community of people doing the same thing
- Pattern recognition (WHY you shop for comfort)

FREE community: [SKOOL LINK]
Full guide ($15 with code NOSPEND50): [GUIDE LINK]

[Signature]
```

#### Conversion Goals

**Primary Goal**: $30 guide purchase OR Standard Skool tier signup
**Secondary Goal**: Recognition of emotional spending pattern
**Long-term Goal**: Premium tier conversion ($9/mo)

---

## B2B Lead Magnets

### 4. Simple Business Bookkeeping

**Type**: Google Sheets template
**Platform**: Google Sheets
**Target Audience**: Solopreneurs, small business owners, service providers

#### What's Included

**Tabs in Spreadsheet**:

1. **Profit & Loss Report Dashboard** (view-only):
   - Total income
   - Total expenses
   - Net profit
   - Monthly comparison chart
   - Category breakdown pie chart

2. **Transactions Log**:
   - Date
   - Description
   - Income/Expense
   - Category (dropdown)
   - Amount
   - Notes

3. **Setup Tab**:
   - **15 Income Categories**: Services, Products, Affiliate, Ads, Sponsorships, Courses, Coaching, Membership, etc.
   - **24 Expense Categories**: Software, Marketing, Contractors, Insurance, Legal, Banking, Office, Education, etc.

4. **Monthly Profit Goal Tracking**:
   - Set monthly goal
   - Track actual vs goal
   - Visual progress bar

**Features**:
- Auto-calculating formulas
- Dropdown categories (prevents typos)
- Year-long tracking capability
- Clean, professional design
- Simple enough for non-accountants
- Professional enough to share with bookkeeper/accountant

#### Delivery Setup

**Technical Implementation**:

1. **Create Master Template**:
   - Build in Google Sheets
   - Protect formula cells
   - Set up "Anyone with link can view"
   - Add sample data (2-3 transactions as examples)

2. **Landing Page**:
   ```
   Headline: Simple Business Bookkeeping (FREE Template)

   Subheadline: Track income, expenses, and profit in one place

   What you'll get:
   ✓ Profit & Loss dashboard
   ✓ Transaction log
   ✓ 15 income + 24 expense categories
   ✓ Monthly goal tracker

   No accounting degree required.

   [GET YOUR FREE TEMPLATE]
   ```

3. **Delivery Email** (Day 0):
   ```
   Subject: Your Simple Business Bookkeeping Template
   Preview: "Start tracking your business finances in 15 minutes..."

   Hi {{first_name}},

   Here's your bookkeeping template: [LINK]

   Quick setup:
   1. Click the link
   2. Go to File → Make a Copy
   3. Delete sample data
   4. Add your first month of transactions

   Watch this 3-minute setup video: [VIDEO LINK]

   Tomorrow I'll send tips for setting up your categories.

   [Signature]
   ```

#### Email Nurture Sequence

**5 Emails over 8 Days**:

**Email 1 (Day 2): Getting Started Tips**
```
Subject: How to set up your categories
Preview: "Customize these for YOUR business..."

Hi {{first_name}},

Your bookkeeping template has 15 income + 24 expense categories.

Here's how to customize them:

1. **Income categories**: Match your revenue streams
   - Services? Which types?
   - Products? Break down by product line
   - Passive income? Separate it out

2. **Expense categories**: Match your spending
   - Software: Design vs Marketing vs Operations
   - Contractors: What do you hire out?
   - Education: Courses vs coaching vs conferences

Make the categories match YOUR business.

Reply if you need help deciding what categories to use.

[Signature]
```

**Email 2 (Day 4): Monthly Bookkeeping Checklist BONUS**
```
Subject: BONUS: Your monthly bookkeeping checklist
Preview: "Never miss a step with this workflow..."

Hi {{first_name}},

Here's a bonus for using the template.

→ Download: Monthly Bookkeeping Checklist [LINK]

Use this checklist every month:
☐ Collect all receipts/invoices
☐ Log transactions in spreadsheet
☐ Reconcile accounts
☐ Review P&L
☐ Analyze: What sold well? What expenses were high?
☐ Adjust next month's plan

15-30 minutes per month = financial clarity all year.

[Signature]
```

**Email 3 (Day 6): Business Central Hub + No-Spend Challenge**
```
Subject: You're tracking expenses. Want to optimize them?
Preview: "Stop the bleeding in your business spending..."

Hi {{first_name}},

You're tracking income and expenses.
That's step 1.

Step 2: Optimize what you're spending.

The Business Central Hub organizes all your templates in one place.
The 30-Day Business No-Spend Challenge helps you:
- Identify duplicate subscriptions
- Cancel what you're not using
- Make ROI-based decisions
- Stop the bleeding

Special offer for template users: [LINK]

[Signature]
```

**Email 4 (Day 8): FREE Skool Community Invite**
```
Subject: Join the Business Central community (FREE)
Preview: "Connect with other business owners like you..."

Hi {{first_name}},

You're not the only one figuring out business finances.

Join the Business Central community (FREE):
✓ Quarterly challenges
✓ Business owners helping each other
✓ Free templates and resources
✓ Monthly check-ins

No credit card required.

→ Join here: [SKOOL LINK]

[Signature]
```

#### Conversion Goals

**Primary Goal**: Standard Skool tier signup
**Secondary Goal**: $47 Business Spreadsheet Pack purchase (includes Subscription Audit GPT)
**Long-term Goal**: $9/mo Premium tier OR $99/yr VIP tier

**Expected Conversion Rates**:
- Email opens: 40-50%
- Skool signups: 10-15%
- Spreadsheet pack purchases: 3-7%
- Eventually Premium tier: 20-30% (over 90 days)

#### Bundle Use

**February or March 2026 Bundles**:
- Can be used as FREE lead magnet
- OR sold at $27 standalone and bundled
- Drives to Business Edition funnel

---

### 5. Subscription Audit Worksheet

**Type**: PDF worksheet + checklist
**Platform**: PDF download
**Target Audience**: Business owners with software overwhelm, subscription creep

#### What's Included

**Component 1: Subscription Inventory Template**

**Columns**:
- Subscription name
- Category (Software - Design/Marketing/Website, Content, Business Tools, etc.)
- Monthly cost
- Annual cost (if billed annually)
- Used in last 90 days? (Y/N)
- Duplicate? (Y/N - is there another tool that does the same thing?)
- Keep/Pause/Cancel decision

**Component 2: Duplicate Detection Checklist**

**Common Duplicates**:
- [ ] Email marketing tools (Mailchimp + ConvertKit + Flodesk)
- [ ] Design tools (Canva Pro + Adobe CC)
- [ ] Video tools (Zoom + Loom + Riverside)
- [ ] Project management (Asana + Trello + ClickUp)
- [ ] Website builders (Squarespace + Wix + Webflow)
- [ ] Calendar scheduling (Calendly + Acuity + SavvyCal)

**Component 3: Annual Cost Calculator**
- Add up all monthly subscriptions
- Multiply by 12
- Add annual subscriptions
- **Total Annual Subscription Cost**: $______

**Component 4: Cancellation Priority Ranking**

**Priority Matrix**:
| High Use + High Cost | Low Use + High Cost |
| (Keep) | (Cancel first!) |
|----------------------|---------------------|
| **High Use + Low Cost** | **Low Use + Low Cost** |
| (Keep) | (Cancel second) |

**Component 5: Cancellation Scripts**

**Email template**:
```
Subject: Cancel [subscription name]

Hi,

I'd like to cancel my subscription to [name].

Account email: [your email]
Reason: No longer needed for my business

Please confirm cancellation and final billing date.

Thank you,
[Your name]
```

**Chat script** (for live support):
```
"I need to cancel my subscription. I'm not using it enough to justify the cost. Can you process that cancellation today and confirm the final billing date?"
```

#### Delivery Setup

**Technical Implementation**:

1. **Create PDF** (6-8 pages):
   - **Page 1**: Cover + why this matters
   - **Page 2**: Subscription inventory template (large table)
   - **Page 3**: Duplicate detection checklist
   - **Page 4**: Annual cost calculator
   - **Page 5**: Priority matrix guide
   - **Pages 6-7**: Cancellation scripts
   - **Page 8**: Next steps (spreadsheet pack + GPT offer)

2. **Landing Page**:
   ```
   Headline: Subscription Audit Worksheet (FREE)

   Subheadline: Identify subscription waste and stop the bleeding

   Use this when:
   ✓ You have 23 business subscriptions and no idea what you're paying
   ✓ You suspect you're paying for duplicates
   ✓ You haven't used half your tools in 90 days
   ✓ Your subscriptions cost more than your revenue some months

   [GET YOUR FREE WORKSHEET]
   ```

3. **Delivery Email** (Day 0):
   ```
   Subject: Your Subscription Audit Worksheet
   Preview: "Find the subscriptions you forgot you had..."

   Hi {{first_name}},

   Here's your Subscription Audit Worksheet: [DOWNLOAD]

   How to complete your audit:
   1. Pull up your credit card statements (last 3 months)
   2. List every subscription (business AND personal that you expense)
   3. Check "used in last 90 days?" column
   4. Add up the annual cost

   Most people find $200-500/month in waste.

   Tomorrow I'll send you common duplicates to look for.

   [Signature]
   ```

#### Email Nurture Sequence

**5 Emails over 12 Days**:

**Email 1 (Day 3): Common Subscription Duplicates**
```
Subject: 7 subscription duplicates business owners have
Preview: "Are you paying for the same thing twice?"

Hi {{first_name}},

Here are the most common duplicates I see:

1. **Design tools**: Canva Pro + Adobe CC
   → Pick one. Most people only need Canva.

2. **Email marketing**: Mailchimp + ConvertKit + Flodesk
   → You only need one. Migrate and cancel the rest.

3. **Video tools**: Zoom + Loom + Riverside
   → Zoom for calls, Loom for screen recording. Cancel the rest.

4. **Project management**: Asana + Trello + ClickUp + Notion
   → Pick ONE. Seriously.

Check your worksheet.
Are you paying for duplicates?

[Signature]
```

**Email 2 (Day 6): My Audit Story**
```
Subject: Here's what I found in MY audit
Preview: "$3,400/year in waste. Here's how..."

Hi {{first_name}},

I did my own subscription audit last year.

Found:
- $283/month in subscriptions I wasn't using
- $3,400/year in total waste
- 4 tools that did the same thing

Cancelled:
- Adobe CC (switched to Canva Pro only)
- 2 project management tools (kept Notion)
- 3 content tools I bought and never opened

Freed up: $283/month for things that actually move my business forward.

Your turn.
What did you find?

Reply and tell me.

[Signature]
```

**Email 3 (Day 9): Decision Framework**
```
Subject: Keep, pause, or cancel? Here's how to decide.
Preview: "Use this framework for each subscription..."

Hi {{first_name}},

For each subscription, ask:

**KEEP if**:
- Used in last 30 days
- No cheaper alternative exists
- Directly contributes to revenue or operations

**PAUSE if**:
- Seasonal use (you'll need it later)
- In trial period
- Unsure but it's cheap

**CANCEL if**:
- Haven't used in 90+ days
- Duplicate tool exists
- "I'll use it someday" thinking
- Cost > value

When in doubt, cancel.
You can always resubscribe.

[Signature]
```

**Email 4 (Day 11): Want Help Deciding?**
```
Subject: Let the Subscription Audit GPT help you decide
Preview: "AI-powered decision support for what to keep..."

Hi {{first_name}},

Stuck on what to cancel?

The Subscription Audit GPT helps you:
- Decide keep/pause/cancel for each tool
- Identify duplicates automatically
- Calculate true cost vs value
- Create cancellation plan

It's included with the Business Spreadsheet Pack.

→ Get the pack + GPT: [LINK to $47 bundle]

What's included:
✓ 4 premium spreadsheet trackers
✓ Subscription Audit GPT (AI decision support)
✓ One-click month generator
✓ Priority support

Stop guessing. Let the GPT help you decide.

[Signature]
```

**Email 5 (Day 12): Join the Business No-Spend Challenge**
```
Subject: Ready to stop the bleeding?
Preview: "30 days to optimize your business spending..."

Hi {{first_name}},

You've identified the subscriptions.
Now what?

The Business No-Spend Challenge helps you:
- Actually cancel what you identified
- Use what you already have
- Make ROI-based decisions going forward
- Stop subscription creep

FREE community: [SKOOL LINK]
Full system: [BUSINESS EDITION LINK]

[Signature]
```

#### Conversion Goals

**Primary Goal**: $47 Business Spreadsheet Pack purchase (includes Subscription Audit GPT)
**Secondary Goal**: Standard Skool tier signup
**Long-term Goal**: $9/mo Premium tier OR $99/yr VIP tier (7 custom GPTs)

---

## Implementation Checklist

### Technical Setup (For Each Lead Magnet)

- [ ] **Create the asset** (spreadsheet, PDF, quiz)
- [ ] **Set up hosting** (Google Drive links, Teachable, Gumroad, etc.)
- [ ] **Create landing page** with email opt-in
- [ ] **Set up email sequences** in ConvertKit or MailerLite
- [ ] **Tag subscribers** by lead magnet (for segmentation)
- [ ] **Test delivery** (download links work, emails send)
- [ ] **Create tracking links** (UTM parameters for source tracking)
- [ ] **Set up conversion tracking** (Skool signups, guide purchases)

### Email Platform Setup

**Automation Required**:

1. **Opt-in trigger**: When someone subscribes to [Lead Magnet]
2. **Add tag**: [Lead Magnet Name] - [Date]
3. **Send sequence**: [Lead Magnet] nurture sequence
4. **Delay between emails**: As specified in each sequence
5. **Remove from sequence if**: They purchase OR join Skool Premium tier
6. **Add to segment**: B2C or B2B (for future campaigns)

### Landing Page Template

**Required Elements**:
- Clear headline (problem-focused)
- Subheadline (benefit-focused)
- Bullet points (what's included)
- Email opt-in form
- Privacy statement
- Preview image (if applicable)
- CTA button (above the fold)

**Tools**: Carrd, ConvertKit landing pages, Leadpages, or custom HTML

---

## Tracking & Metrics

### Key Metrics to Track

**For Each Lead Magnet**:

| Metric | Target | How to Track |
|--------|--------|--------------|
| Landing page views | - | Google Analytics, Carrd stats |
| Opt-in rate | 30-50% | (Signups / Page views) x 100 |
| Email open rate | 40-50% | Email platform analytics |
| Email click rate | 10-20% | Email platform analytics |
| Skool Standard signups | 10-15% | Tag + Skool member list |
| Paid conversions | 2-5% | Tag + purchase platform |
| Cost per lead | Varies | Ad spend / Leads (if running ads) |

### Success Indicators

**Good Performance**:
- ✅ Opt-in rate above 35%
- ✅ Email open rate above 40%
- ✅ At least 10% convert to Skool Standard tier
- ✅ At least 2% purchase within 30 days

**Needs Improvement**:
- ⚠️ Opt-in rate below 25% → Test new headline/copy
- ⚠️ Email open rate below 30% → Test new subject lines
- ⚠️ No conversions after 14 days → Revisit email sequence CTAs

### A/B Testing Ideas

**Landing Page Tests**:
- Headline variations
- Long form vs short form copy
- Preview image vs no image
- "Get instant access" vs "Download now" CTA

**Email Tests**:
- Subject line variations
- Story-based vs tip-based content
- Hard sell vs soft sell CTAs
- Send time (morning vs evening)

---

## Cross-References

- See **EMAIL_SEQUENCES.md** for complete email copy
- See **LANDING_PAGE_COPY.md** for landing page sales copy
- See **SKOOL_COMMUNITY_STRUCTURE.md** for Standard tier experience
- See **extraction_docs/08_Lead_Magnets_And_Funnels.md** for original research
- See **extraction_docs/05_Marketing_And_Launch_Strategy.md** for bundle strategy

---

**Document Status**: Complete lead magnet implementation guide
**Last Updated**: December 31, 2024
**Ready to Build**: Yes - all assets defined with implementation details
**Next Steps**: Create assets, set up landing pages, build email sequences
