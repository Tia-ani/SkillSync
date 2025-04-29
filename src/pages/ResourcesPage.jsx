import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUserData } from '../contexts/UserDataContext'
import { 
  FiPlus, 
  FiSearch, 
  FiTrash2, 
  FiExternalLink, 
  FiInfo,
  FiBookmark,
  FiCode,
  FiBook,
  FiVideo,
  FiFile
} from 'react-icons/fi'
import { format } from 'date-fns'

// Mock resources for initial data
const mockResources = [
  {
    id: '1',
    title: 'React Documentation',
    url: 'https://reactjs.org/docs/getting-started.html',
    category: 'Documentation',
    tags: ['React', 'Frontend'],
    description: 'Official React documentation',
    date: new Date(2023, 5, 15).toISOString()
  },
  {
    id: '2',
    title: 'LeetCode Problems',
    url: 'https://leetcode.com/problemset/all/',
    category: 'Practice',
    tags: ['DSA', 'Algorithms'],
    description: 'Coding problems and solutions',
    date: new Date(2023, 6, 20).toISOString()
  },
  {
    id: '3',
    title: 'Kent C. Dodds Blog',
    url: 'https://kentcdodds.com/blog',
    category: 'Blog',
    tags: ['JavaScript', 'Testing', 'React'],
    description: 'Articles on JavaScript, React, and Testing',
    date: new Date(2023, 7, 5).toISOString()
  }
]

function ResourcesPage() {
  const { userData, addResource, deleteResource } = useUserData()
  const [isAddingResource, setIsAddingResource] = useState(false)
  const [newResourceData, setNewResourceData] = useState({
    title: '',
    url: '',
    category: 'Documentation',
    tags: '',
    description: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  
  // Initialize resources with mock data if empty
  const initializeMockResources = () => {
    if (userData.resources.length === 0) {
      mockResources.forEach(resource => {
        addResource(resource)
      })
    }
  }
  
  // Call once when component mounts
  useState(() => {
    initializeMockResources()
  }, [])
  
  const handleAddResource = (e) => {
    e.preventDefault()
    
    // Process tags
    const tagsArray = newResourceData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '')
    
    addResource({
      ...newResourceData,
      tags: tagsArray
    })
    
    setNewResourceData({
      title: '',
      url: '',
      category: 'Documentation',
      tags: '',
      description: ''
    })
    
    setIsAddingResource(false)
  }
  
  const filteredResources = userData.resources.filter(resource => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchLower) ||
      resource.description.toLowerCase().includes(searchLower) ||
      resource.url.toLowerCase().includes(searchLower) ||
      (resource.tags && resource.tags.some(tag => 
        typeof tag === 'string' && tag.toLowerCase().includes(searchLower)
      ))
    
    const matchesCategory = categoryFilter === 'All' || resource.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })
  
  // Sort resources by date (newest first)
  const sortedResources = [...filteredResources].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )
  
  // Get unique categories for filter
  const categories = ['All', ...new Set(userData.resources.map(r => r.category))]
  
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Documentation':
        return <FiBook className="h-4 w-4" />
      case 'Tutorial':
        return <FiVideo className="h-4 w-4" />
      case 'Blog':
        return <FiBookmark className="h-4 w-4" />
      case 'Practice':
        return <FiCode className="h-4 w-4" />
      default:
        return <FiFile className="h-4 w-4" />
    }
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          Learning Resources
        </motion.h1>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500 dark:text-neutral-400">
              <FiSearch className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search resources..."
              className="input pl-9 pr-4 py-2 w-full"
            />
          </div>
          
          <button 
            onClick={() => setIsAddingResource(true)}
            className="btn btn-primary flex items-center"
          >
            <FiPlus className="mr-2" />
            Add Resource
          </button>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
              categoryFilter === category
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300 font-medium'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {isAddingResource && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4">Add New Resource</h2>
          <form onSubmit={handleAddResource}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="resourceTitle" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Title
                </label>
                <input
                  id="resourceTitle"
                  type="text"
                  value={newResourceData.title}
                  onChange={(e) => setNewResourceData({...newResourceData, title: e.target.value})}
                  className="input w-full"
                  placeholder="e.g. React Hooks Tutorial"
                  required
                />
              </div>
              <div>
                <label htmlFor="resourceURL" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  URL
                </label>
                <input
                  id="resourceURL"
                  type="url"
                  value={newResourceData.url}
                  onChange={(e) => setNewResourceData({...newResourceData, url: e.target.value})}
                  className="input w-full"
                  placeholder="https://example.com/resource"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="resourceCategory" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Category
                </label>
                <select
                  id="resourceCategory"
                  value={newResourceData.category}
                  onChange={(e) => setNewResourceData({...newResourceData, category: e.target.value})}
                  className="input w-full"
                >
                  <option value="Documentation">Documentation</option>
                  <option value="Tutorial">Tutorial</option>
                  <option value="Blog">Blog</option>
                  <option value="Practice">Practice</option>
                  <option value="Course">Course</option>
                  <option value="Book">Book</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="resourceTags" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  id="resourceTags"
                  type="text"
                  value={newResourceData.tags}
                  onChange={(e) => setNewResourceData({...newResourceData, tags: e.target.value})}
                  className="input w-full"
                  placeholder="e.g. React, Frontend, Hooks"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="resourceDescription" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Description
              </label>
              <textarea
                id="resourceDescription"
                value={newResourceData.description}
                onChange={(e) => setNewResourceData({...newResourceData, description: e.target.value})}
                className="input w-full h-24"
                placeholder="A brief description of this resource..."
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingResource(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newResourceData.title.trim() || !newResourceData.url.trim()}
                className="btn btn-primary"
              >
                Add Resource
              </button>
            </div>
          </form>
        </motion.div>
      )}
      
      {sortedResources.length === 0 ? (
        <div className="card p-12 text-center">
          <FiInfo className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No resources found</h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            {searchTerm || categoryFilter !== 'All'
              ? "No resources match your current filters."
              : "You haven't added any learning resources yet."}
          </p>
          {!searchTerm && categoryFilter === 'All' && (
            <button 
              onClick={() => setIsAddingResource(true)}
              className="btn btn-primary inline-flex items-center"
            >
              <FiPlus className="mr-2" />
              Add Your First Resource
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResources.map(resource => (
            <ResourceCard 
              key={resource.id}
              resource={resource}
              onDelete={() => deleteResource(resource.id)}
              getCategoryIcon={getCategoryIcon}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ResourceCard({ resource, onDelete, getCategoryIcon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden h-full flex flex-col"
      whileHover={{ y: -4 }}
    >
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/50 dark:text-primary-300">
              {getCategoryIcon(resource.category)}
              <span className="ml-1">{resource.category}</span>
            </span>
          </div>
          <button
            onClick={onDelete}
            className="p-1 text-neutral-500 hover:text-error-500 dark:text-neutral-400 dark:hover:text-error-400"
            aria-label="Delete resource"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
        
        {resource.description && (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
            {resource.description}
          </p>
        )}
        
        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline mb-4"
        >
          Visit Resource
          <FiExternalLink className="ml-1 h-4 w-4" />
        </a>
        
        {resource.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {resource.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      <div className="px-6 py-3 bg-neutral-50 dark:bg-neutral-800/60 text-xs text-neutral-500 dark:text-neutral-400 mt-auto">
        Added {format(new Date(resource.date), 'MMM d, yyyy')}
      </div>
    </motion.div>
  )
}

export default ResourcesPage