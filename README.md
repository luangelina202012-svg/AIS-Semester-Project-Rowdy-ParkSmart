ParkRunner — browser-only parking simulation

HOW TO OPEN
1. Extract the entire ZIP using File Explorer > Extract All.
2. Open the extracted ParkRunner-Browser folder.
3. Double-click index.html to open it in your browser.
Keep index.html, style.css and script.js in the same folder.
Do not run the files from inside the ZIP viewer.
No Java, JDK, VS Code, terminal commands, Live Server or backend is required.
The browser's address can start with file://. The demo also works offline.
Official UTSA map/information links require an internet connection when opened.

WHAT CHANGED
- Moved allocation and availability generation into script.js, using Math.random.
- Embedded the 27-area catalog from your uploaded lots.tsv in LOT_CATALOG.
  A file:// page does not need to fetch a separate data file anymore.
- Kept your updated BK1-BK5 capacities and accessible-space settings.
- Removed all API requests and localhost/Java connection requirements.
- Removed external font loading so the display uses local fallback fonts.
- Updated index.html and detail panels to describe the local simulation.
- Java files, lots.tsv and start-windows.bat are not used by this version.
  Keep old copies elsewhere if you want to preserve them; they are not needed here.

FILES
index.html — page structure and controls
style.css — colors, layout and local fonts
script.js — lot catalog, simulation, state and button behavior

BUTTONS AND CONTROLS
Refresh: redraws the current counts without generating new random values.
Simulate new data: generates random available counts in each demo category.
Automatic updates: simulates every 15 seconds while enabled. Browser timers may
run less often when the tab is in the background or the device is asleep.
Reset demo: restores this page load's starting counts, clears filters/search,
resets sorting and enables automatic updates.
Search, category filters, status chips and sorting all operate on the local data.
Select a parking card to view counts, category capacities, and official links.
Close details with X, Escape, or a click outside the panel.
Navigation links scroll to the corresponding sections.

SIMULATION RULES
On opening the page, each lot reserves its configured accessible capacity.
The remaining capacity is randomly divided into employee and student capacity.
Those capacities remain fixed during this page load.
Simulate randomly chooses availability between zero and each category capacity.
Employee, student and accessible availability sum to total available.
Total available plus occupied equals total capacity.
Reset restores the initial state; refreshing/reopening the entire page creates a
new random initial state. Data is not saved between page loads or shared tabs.
All 26 named surface lots plus University Oaks grouped remain; no garages.
All counts and capacities, including category splits, are illustrative, not actual
UTSA measurements or permit eligibility. Check posted signs and official rules.

HOW TO EDIT LATER
For layout text, edit index.html. For appearance, edit style.css.
For lot settings, edit LOT_CATALOG near the top of script.js:
  capacity: total illustrative spaces
  accessibleCapacity: illustrative accessible allocation
Use whole numbers, capacity > 0, and accessibleCapacity between 0 and capacity.
Category tags describe designated-space labels, not the random simulation split.
Save your files and refresh the browser (Ctrl+Shift+R if changes are cached).
No compilation or server restart is needed.

TROUBLESHOOTING
Text-only page: extract all files and keep style.css alongside index.html.
No cards: keep script.js alongside index.html and enable JavaScript in the browser.
Connection-to-Java message: you opened an older project; use this folder's index.html.
If downloaded names acquire (1), (2), etc., restore the exact filenames above.
For a stable screenshot/comparison, turn Automatic updates off.

VERIFICATION
JavaScript syntax, local file references and navigation targets checked.
DOM interaction checks ran in a file:// context with fetch disabled, covering all
27 areas, search, combined filters, all sorts, details, refresh, reset, timer/pause,
and 200 simulations. Category sums, allocations and count bounds passed.
Full browser rendering has not been verified in this environment.
