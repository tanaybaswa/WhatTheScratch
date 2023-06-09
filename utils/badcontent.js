const Filter = require('bad-words');
const filter = new Filter();

filter.addWords("69", "sixty nine", "sixtynine", "muthafucka");

const checkBadContent = (post) => {

    if(post.tag.some((t) => filter.isProfane(t))){
      return true;
    }

    if(filter.isProfane(post.prompt)){
      return true;
    }

    return false;
}

export default checkBadContent;