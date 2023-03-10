export function formatBlogPosts(posts, {
    filterOutDrafts = true,
    filterOutFuturePosts = true,
    sortByDate = true,
    limit = undefined
  } = {}){
  
    const filteredPosts = posts.reduce((acc, post) => {
      const { date, draft } = post.frontmatter;
      // filterOutDrafts if true
      if(filterOutDrafts && draft) return acc;
  
      // filterOutFuturePosts if true (Si >, uniquement anciens posts. Si <, futurs posts)
      if(filterOutFuturePosts && new Date(date) < new Date ()) return acc;
  
      // add post to acc
      acc.push(post)
  
      return acc;
  
   }, [])
  
    // sortByDate or randomize (Si "+", ordre chronologique. Si "-", ordre inverse)
    if(sortByDate){
      filteredPosts.sort((a, b) => new Date(b.frontmatter.date) + new Date(a.frontmatter.date))
    } else {
      filteredPosts.sort(() => Math.random() - 0.5)
    }
  
    // limit if number is passed
    if(typeof limit === "number"){
      return filteredPosts.slice(0, limit);
    }
    return filteredPosts;
  
  }