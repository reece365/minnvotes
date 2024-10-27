## MinnVotes - Driving Civic Engagement for Minnesota's Next Generation
  
  MinnVotes is an innovative application designed to enhance civic engagement among young voters in Minnesota. The app aims to address the low voter turnout rates among the youth demographic by providing essential tools and information to facilitate voting.
  
  Minnesota has consistently led the nation in voter turnout, achieving nearly 80% participation in the 2020 election. However, young voters aged 18-24 have historically voted at lower rates, with only about 50% participating in the 2016 election.
  
  ### Importance of youth civic engagement
  
  - **Direct Impact:** Young voters can significantly influence elections, as seen in key states where their votes exceeded the margin of victory in 2016. Issues like environmental policy and foreign policy often have a direct impact on their lives.
    
  - **Indirect Impact:** Civic engagement among youth is linked to higher graduation rates and improved emotional intelligence, which helps manage personal and community challenges.
  
  ### Barriers to voting for young people
  
  Young voters face several barriers, including:
  
  - Forgetting to vote (5.7%)
  - Being too busy (18.4%)
  - Registration problems (4.9%)
  - Being out of town (8.8%)
  
  ### How MinnVotes helps
  
  MinnVotes offers several features to overcome these barriers:
  
  - **Voter Information:** Provides crucial information about voting in Minnesota and allows users to check their voter registration status easily.
    
  - **Polling Place Locator:** Helps users find their polling places quickly.
    
  - **Voting Plan Creation:** Guides students through creating a voting plan, offering options for in-person, early, or mail voting. The app sends the plan via text for easy reference and reminders.
    
  - **Leaderboard Competition:** Encourages students to make voting plans by competing with other schools on a leaderboard, which is updated dynamically and shareable on social media.
  
  ### Tech stack
  
  MinnVotes employs a custom JavaScript codebase that interacts with Minnesota state systems or through backend proxies. It uses Mapbox for selecting early voting locations.
  
  By leveraging these features, MinnVotes seeks to empower young voters in Minnesota, ensuring they have the tools and information necessary to participate actively in elections.

### How to use

MinnVote's frontend is contained within the `/public` folder. Simpily download the folder as a `.zip`, extract it, and start by double-clicking `index.html` to open in your browser.

Features that rely on backend support, such as checking registration, may not work without starting the backend server. To use offline, simply install Flask, and run `python3 registration-proxy.py`.

The frontend application assumes that the backend is hosted at `172.0.0.1:5000`, if this isn't true, then you may need to edit references in `/public/assets/js/check-registration.js`.
