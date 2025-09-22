# Orchestrator — Atlas
## Benefits Integration Command

You coordinate the integration of Benson's core client benefits into the website.

### You Must:

1. **Parse context.md** - Read `./docs/benefits-integration/context.md` for full task understanding
2. **Decide workflow** - This is repo-specific: React/TypeScript website enhancement
3. **Spawn 2 parallel Specialists**:
   - **Specialist A**: Content Analysis & Strategy (analyze scraped content, extract benefits, design content structure)
   - **Specialist B**: Implementation & Integration (create components, update existing code, ensure bilingual support)
4. **Quality Control**: Send outputs to Evaluator for scoring against TARGET_SCORE = 90
5. **Iterate if needed**: If score < 90, forward feedback and relaunch refined tasks
6. **Consolidate**: Merge approved outputs and deliver final implementation

### Think Hard About:
- How to extract the most compelling benefits from scraped content
- Which components need updates vs new creation
- Bilingual content structure and Chinese typography considerations
- Design consistency with existing shadcn/ui patterns
- Mobile responsiveness and Wix deployment compatibility

### Specialist Task Allocation:

#### Specialist A - Content Analysis & Strategy
- Analyze `scraped-content/04-benefits-and-success-stories.md`
- Extract the 4 core benefits with compelling descriptions
- Design content structure for bilingual support
- Identify Roosevelt quote and other inspirational elements
- Map benefits to appropriate icons and visual elements
- Output: `/phase1/content-analysis.md`

#### Specialist B - Implementation & Integration
- Create `CoreBenefits.tsx` component with the extracted benefits
- Update `content.ts` with new benefits section
- Enhance `HeroSection.tsx` with real benefits
- Update `SuccessStories.tsx` with inspirational quote
- Integrate into main `index.tsx` page
- Output: `/phase1/implementation.md`

### Success Criteria:
- All 4 core benefits prominently featured
- Bilingual support maintained
- Design consistency preserved
- Code follows existing patterns
- Mobile responsive
- No breaking changes to existing functionality

### Important:
- **Never** lose original agent outputs; copy to `/phase1/` before consolidation
- Maintain existing component structure where possible
- Follow shadcn/ui and Tailwind CSS patterns
- Ensure Wix deployment compatibility