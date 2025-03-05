# Venice AI - API Client UI

## Todos:
**Code Cleanup:**
- [x] split code into multiple files
- [ ] look into cleaning up app state

**Features**
- [ ] expose model features like web_search, etc.

**Layout**
- [x] clean up UI switch between image/text generation mode
- [ ] add drawer/sidebars

**Image Generation**
- [x] check image style 'none' error
- [ ] add extended options for image gen, etc. to match API spec
- [ ] improve the image generation UI, maybe add images into a gallery on the side per conversation, etc

**Styling/Theming**
- [x] integrate chakra UI (in progress)
- [x] convert chat window into more of a back and forth, text message style UI
- [ ] add special formatting for 'think' modes in deepseek models, other reasoning output
- [ ] determine if there are any code output options available
- [ ] consider alternate UI for code generation with subset of models

**Web3**
- [ ] check options for signing in with wallet and using browser storage to create accounts, allow deletion (like venice)
- [ ] phase 1: add a donate button
- [ ] phase 2: require payment after trial usage (resets daily)
- [ ] phase 3: allow users to one-click deploy app with their API key, for one-time fee (and/or % fee)
- [ ] vercel for FE deployment?
