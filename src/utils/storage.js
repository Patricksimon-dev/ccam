const STORAGE_KEY = 'church_cms_data'

export const defaultData = {
  announcements: [
    {
      id: '1',
      title: 'Welcome to Our Church Family',
      content: 'We are delighted to welcome all visitors this Sunday. Join us for worship at 10:00 AM.',
      date: '2026-07-13',
      pinned: true,
    },
    {
      id: '2',
      title: 'Youth Ministry Registration Open',
      content: 'Registration for the fall youth program is now open. Sign up at the welcome desk after service.',
      date: '2026-07-10',
      pinned: false,
    },
  ],
  sermons: [
    {
      id: '1',
      title: 'Walking in Faith',
      preacher: 'Pastor John Smith',
      date: '2026-07-13',
      scripture: 'Hebrews 11:1',
      summary: 'An inspiring message about trusting God through every season of life.',
      videoUrl: '',
      audioUrl: '',
    },
    {
      id: '2',
      title: 'The Power of Prayer',
      preacher: 'Pastor John Smith',
      date: '2026-07-06',
      scripture: 'James 5:16',
      summary: 'Discover how consistent prayer transforms our hearts and communities.',
      videoUrl: '',
      audioUrl: '',
    },
  ],
  activities: [
    {
      id: '1',
      title: 'Sunday Worship Service',
      day: 'Sunday',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      description: 'Weekly worship with praise, prayer, and the Word.',
    },
    {
      id: '2',
      title: 'Bible Study',
      day: 'Wednesday',
      time: '7:00 PM',
      location: 'Fellowship Hall',
      description: 'Mid-week Bible study for all ages.',
    },
    {
      id: '3',
      title: 'Youth Group',
      day: 'Friday',
      time: '6:30 PM',
      location: 'Youth Center',
      description: 'Games, worship, and fellowship for teens.',
    },
  ],
  events: [
    {
      id: '1',
      title: 'Community Outreach Day',
      date: '2026-07-26',
      time: '9:00 AM',
      location: 'Church Grounds',
      description: 'Join us as we serve our neighbors with food, clothing, and prayer.',
      imageUrl: '',
    },
    {
      id: '2',
      title: 'Annual Church Picnic',
      date: '2026-08-15',
      time: '12:00 PM',
      location: 'Riverside Park',
      description: 'Food, games, and fellowship for the whole family.',
      imageUrl: '',
    },
  ],
  about: {
    welcomeTitle: 'Who We Are',
    welcomeText:
      'Grace Community Church is a welcoming congregation dedicated to knowing Christ and making Him known. Since 1985, we have been a spiritual home for families, singles, and seekers from all walks of life.',
    mission:
      'To lead people into a growing relationship with Jesus Christ through worship, discipleship, and service.',
    vision:
      'A thriving community where every person experiences God\'s grace and shares it with the world.',
    history:
      'Founded in 1985 by a small group of believers, Grace Community Church began meeting in a local school gymnasium. Through faithful giving and prayer, we built our current sanctuary in 1998. Today we serve hundreds of families and partner with ministries locally and abroad.',
    values: 'Worship · Fellowship · Discipleship · Service · Prayer',
  },
  leadership: [
    {
      id: '1',
      name: 'Pastor John Smith',
      role: 'Senior Pastor',
      bio: 'Pastor John has served Grace Community Church for over 15 years. He holds a Master of Divinity and is passionate about expository preaching and community outreach.',
      imageUrl: '',
    },
    {
      id: '2',
      name: 'Mary Johnson',
      role: 'Worship Leader',
      bio: 'Mary leads our worship team with a heart for authentic praise. She has been involved in music ministry for 20 years and trains new musicians each season.',
      imageUrl: '',
    },
    {
      id: '3',
      name: 'David Williams',
      role: 'Youth Pastor',
      bio: 'David mentors teens and young adults, building programs that combine fun, faith, and fellowship. He joined our staff in 2019.',
      imageUrl: '',
    },
    {
      id: '4',
      name: 'Sarah Chen',
      role: 'Church Administrator',
      bio: 'Sarah oversees day-to-day operations and coordinates our deacon board. She has been a member since 2005 and served on leadership since 2012.',
      imageUrl: '',
    },
  ],
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return structuredClone(defaultData)
    const parsed = JSON.parse(raw)
    return {
      ...structuredClone(defaultData),
      ...parsed,
      about: { ...defaultData.about, ...parsed.about },
    }
  } catch {
    return structuredClone(defaultData)
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function generateId() {
  return crypto.randomUUID()
}
