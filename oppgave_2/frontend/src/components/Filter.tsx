 {/* Filters */}
 <div className="bg-gray-100 py-4">
 <div className="container mx-auto flex flex-wrap items-center space-x-4">
   <div className="flex items-center space-x-2">
     <label htmlFor="month">Month:</label>
     <select id="month" className="border rounded px-2 py-1">
       <option>All</option>
       <option>January</option>
       <option>February</option>
       <option>March</option>
       <option>April</option>
     </select>
   </div>
   <div className="flex items-center space-x-2">
     <label htmlFor="year">Year:</label>
     <select id="year" className="border rounded px-2 py-1">
       <option>All</option>
       <option>2023</option>
       <option>2024</option>
     </select>
   </div>
   <div className="flex items-center space-x-2">
     <label htmlFor="eventType">Event Type:</label>
     <select id="eventType" className="border rounded px-2 py-1">
       <option>All</option>
       <option>Seminars</option>
       <option>Workshops</option>
       <option>Conferences</option>
     </select>
   </div>
 </div>
</div>