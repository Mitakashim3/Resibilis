# Keyword Strategy for Resibilis

## 🎯 SEO Keyword Hierarchy

### **Head Terms** (Short, High Competition, High Volume)
Primary keywords with high search volume but difficult to rank for initially.

| Keyword | Monthly Volume* | Competition | Current Ranking Goal |
|---------|----------------|-------------|---------------------|
| receipt generator | 10K-100K | High | Month 6-12 |
| invoice maker | 10K-100K | High | Month 6-12 |
| free receipt | 5K-50K | High | Month 3-6 |
| resibo | 1K-10K | Medium | Month 1-3 (PH-specific) |
| receipt maker | 5K-50K | High | Month 6-12 |

*Estimated for Philippine market

---

### **Body Keywords** (Medium-Tail, Moderate Competition)
2-3 word phrases with decent search volume and achievable rankings.

| Keyword | Monthly Volume* | Competition | Current Ranking Goal |
|---------|----------------|-------------|---------------------|
| receipt generator philippines | 1K-5K | Medium | Month 1-3 |
| free receipt generator | 5K-10K | Medium | Month 2-4 |
| online receipt maker | 1K-5K | Medium | Month 2-4 |
| invoice generator free | 1K-5K | Medium | Month 2-4 |
| digital receipt maker | 500-1K | Low-Medium | Month 1-2 |
| professional receipt generator | 500-1K | Low-Medium | Month 1-3 |
| receipt template generator | 500-1K | Low-Medium | Month 1-3 |
| business receipt maker | 500-1K | Medium | Month 2-4 |
| resibo generator | 500-1K | Low | Month 1-2 (PH-specific) |
| filipino receipt maker | 100-500 | Low | Month 1-2 |

---

### **Long-Tail Keywords** (3+ words, Low Competition, High Intent)
Specific phrases with lower volume but higher conversion potential.

#### **For Freelancers**
| Keyword | Monthly Volume* | Competition | Priority |
|---------|----------------|-------------|----------|
| free receipt generator for freelancers | 100-500 | Low | HIGH |
| receipt maker for filipino freelancers | 50-100 | Very Low | HIGH |
| how to create receipt for freelance work | 100-500 | Low | HIGH |
| online receipt generator philippines freelancer | 50-100 | Very Low | HIGH |
| generate receipt for upwork payment | 50-100 | Low | MEDIUM |
| freelance invoice generator philippines | 100-500 | Low | HIGH |

#### **For Students**
| Keyword | Monthly Volume* | Competition | Priority |
|---------|----------------|-------------|----------|
| receipt generator for students | 50-100 | Very Low | MEDIUM |
| how to make receipt for school project | 100-500 | Low | MEDIUM |
| free receipt maker for students philippines | 10-50 | Very Low | LOW |

#### **For Small Business**
| Keyword | Monthly Volume* | Competition | Priority |
|---------|----------------|-------------|----------|
| receipt generator for small business philippines | 100-500 | Low | HIGH |
| free invoice generator for sari sari store | 50-100 | Very Low | MEDIUM |
| simple receipt maker for small sellers | 50-100 | Low | MEDIUM |
| online receipt for small business free | 100-500 | Low | HIGH |
| resibo maker para sa negosyo | 50-100 | Very Low | MEDIUM |

#### **Feature-Specific**
| Keyword | Monthly Volume* | Competition | Priority |
|---------|----------------|-------------|----------|
| receipt generator with logo | 100-500 | Low | MEDIUM |
| customizable receipt template | 100-500 | Low | MEDIUM |
| receipt generator download png | 50-100 | Very Low | LOW |
| instant receipt maker online | 50-100 | Low | MEDIUM |
| receipt maker no sign up | 100-500 | Low | HIGH |

#### **Problem-Solving Keywords**
| Keyword | Monthly Volume* | Competition | Priority |
|---------|----------------|-------------|----------|
| how to create professional receipt online | 500-1K | Low | HIGH |
| paano gumawa ng resibo online | 50-100 | Very Low | MEDIUM |
| easiest way to make receipt philippines | 50-100 | Very Low | MEDIUM |
| free alternative to invoice software | 100-500 | Low | MEDIUM |

---

## 🇵🇭 Local Philippines Keywords

### **Tagalog/Filipino Keywords**
| Keyword | Monthly Volume* | Competition | Priority |
|---------|----------------|-------------|----------|
| resibo maker | 500-1K | Low | HIGH |
| gumawa ng resibo | 100-500 | Very Low | MEDIUM |
| libre na resibo generator | 50-100 | Very Low | MEDIUM |
| resibo para sa negosyo | 100-500 | Low | MEDIUM |
| paano gumawa ng resibo | 100-500 | Low | MEDIUM |
| online resibo | 100-500 | Low | MEDIUM |

### **Location-Based**
| Keyword | Monthly Volume* | Competition | Priority |
|---------|----------------|-------------|----------|
| receipt generator manila | 50-100 | Very Low | LOW |
| invoice maker philippines | 100-500 | Low | MEDIUM |
| receipt generator cebu | 10-50 | Very Low | LOW |
| filipino business receipt maker | 50-100 | Very Low | MEDIUM |

---

## 📊 Implementation Strategy

### **Phase 1: Month 1-2 (Quick Wins)**
Focus on long-tail, low-competition keywords:
- ✅ Free receipt generator for freelancers
- ✅ Receipt generator philippines
- ✅ Resibo maker
- ✅ Digital receipt maker
- ✅ Receipt maker no sign up

**Actions:**
1. Create dedicated landing pages for each target audience
2. Write blog post: "How to Create Professional Receipts for Freelance Work"
3. Optimize homepage for "free receipt generator"
4. Add FAQ section with long-tail keyword questions

### **Phase 2: Month 3-4 (Build Authority)**
Target body keywords:
- Free receipt generator
- Online receipt maker
- Invoice generator free
- Professional receipt generator

**Actions:**
1. Build backlinks from Filipino freelancer communities
2. Guest post on Philippine business blogs
3. Create video tutorial for YouTube (video SEO)
4. Submit to Philippine business directories

### **Phase 3: Month 5-6 (Competitive Terms)**
Start competing for head terms:
- Receipt generator
- Invoice maker
- Free receipt

**Actions:**
1. Continue content creation
2. Build quality backlinks
3. Improve page speed and Core Web Vitals
4. Enhance user engagement metrics

---

## 📝 Current Keyword Implementation

### **In Code** (src/app/layout.tsx)
```typescript
keywords: [
  'receipt generator',      // HEAD TERM
  'resibo',                // HEAD TERM (Filipino)
  'Filipino',              // MODIFIER
  'invoice',               // HEAD TERM
  'freelancer',            // BODY KEYWORD
  'small business',        // BODY KEYWORD
  'free',                  // MODIFIER
  'receipt maker',         // BODY KEYWORD
  'online receipt',        // BODY KEYWORD
  'Philippines',           // LOCATION
  'professional receipts', // LONG-TAIL
]
```

### **Recommended Updates**
Add these to your keywords array:
```typescript
keywords: [
  // Head Terms
  'receipt generator',
  'invoice maker',
  'resibo',
  'free receipt',
  
  // Body Keywords
  'receipt generator philippines',
  'free receipt generator',
  'online receipt maker',
  'invoice generator free',
  'digital receipt maker',
  'professional receipt generator',
  'business receipt maker',
  
  // Long-Tail (Primary Targets)
  'free receipt generator for freelancers',
  'receipt maker for filipino freelancers',
  'receipt generator for small business philippines',
  'online receipt generator no sign up',
  
  // Modifiers
  'filipino',
  'philippines',
  'free',
  'instant',
  'professional',
  
  // Local
  'resibo maker',
  'resibo generator',
]
```

---

## 🎯 Content Strategy by Keyword

### **Blog Post Ideas** (Target Long-Tail Keywords)

1. **"How to Create Professional Receipts for Freelance Work in the Philippines"**
   - Target: "free receipt generator for freelancers"
   - Target: "receipt maker for filipino freelancers"
   - Word count: 1,500-2,000 words

2. **"5 Free Receipt Generators for Small Business Owners in 2026"**
   - Target: "receipt generator for small business philippines"
   - Target: "free invoice generator"
   - Word count: 2,000-2,500 words

3. **"Paano Gumawa ng Professional na Resibo Online (Step-by-Step Guide)"**
   - Target: "paano gumawa ng resibo"
   - Target: "resibo maker"
   - Word count: 1,500 words (Tagalog)

4. **"Receipt Generator vs Invoice Software: What Filipino Freelancers Need"**
   - Target: "invoice generator free"
   - Target: "free alternative to invoice software"
   - Word count: 1,800 words

### **Landing Pages to Create**

1. `/freelancers` - "Receipt Generator for Filipino Freelancers"
2. `/small-business` - "Free Receipt Maker for Small Business"
3. `/students` - "Receipt Generator for Students"
4. `/how-to-make-receipt` - "How to Make a Professional Receipt Online"

---

## 📈 Tracking & Measurement

### **Key Metrics to Monitor**

1. **Keyword Rankings**
   - Track top 20 keywords weekly
   - Focus on position improvements for long-tail first
   - Use Google Search Console "Queries" report

2. **Organic Traffic**
   - Target: 100+ monthly visits by Month 2
   - Target: 500+ monthly visits by Month 6
   - Target: 2,000+ monthly visits by Month 12

3. **Click-Through Rate (CTR)**
   - Target: 3-5% CTR for top 10 rankings
   - Optimize meta titles/descriptions for low-CTR pages

4. **Conversions**
   - Track receipt downloads
   - Track sign-ups (if applicable)
   - Monitor user retention

### **Tools to Use**

- **Google Search Console** - Keyword rankings, CTR, impressions
- **Google Analytics 4** - Traffic, conversions, user behavior
- **Ahrefs/SEMrush** (Free tier) - Competitor analysis, keyword research
- **Ubersuggest** (Free) - Keyword ideas, search volume

---

## 🚀 Quick Action Items

### **This Week**
- [ ] Update keywords in `layout.tsx` with expanded list
- [ ] Add FAQ section to homepage with long-tail keyword questions
- [ ] Create `/freelancers` landing page
- [ ] Write first blog post targeting "free receipt generator for freelancers"

### **This Month**
- [ ] Create all 4 landing pages
- [ ] Write 2-3 blog posts
- [ ] Submit to 5 Philippine business directories
- [ ] Build 5 quality backlinks

### **Month 2-3**
- [ ] Publish 4+ blog posts
- [ ] Guest post on 2 Filipino freelancer blogs
- [ ] Create YouTube tutorial
- [ ] Monitor and adjust based on Search Console data

---

## 💡 Pro Tips

1. **Focus on Intent**: Target keywords where users want to create receipts NOW
2. **Local First**: Filipino-specific keywords are easier to rank for
3. **User Questions**: Answer specific questions in content
4. **Long-tail First**: Build authority with easy wins before tackling head terms
5. **Content Quality**: Better to rank #1 for 10 long-tail keywords than #50 for 1 head term

---

**Last Updated:** January 3, 2026
**Next Review:** February 2026
