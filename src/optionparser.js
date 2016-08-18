function valid(name) {
  // TODO: validate against options dictionary
  return name.indexOf('smartbanner:') !== -1 && name.split(':')[1].length > 0;
}

function convertToCamelCase(name) {
  let parts = name.split('-');
  for (var i = 0; i < parts.length; i++) {
    if (i > 0) {
      let part = parts[i];
      parts[i] = part.charAt(0).toUpperCase() + part.substring(1);
    }
  }
  return parts.join('');
}

export default class OptionParser {

  parse() {
    let metas = document.getElementsByTagName('meta');
    let options = {};
    let optionName = null;
    for (var i = 0; i < metas.length; i++) {
      let name = metas[i].getAttribute('name');
      let content = metas[i].getAttribute('content');
      if (name && content && valid(name) && content.length > 0) {
        optionName = name.split(':')[1];
        if (optionName.indexOf('-') !== -1) {
          optionName = convertToCamelCase(optionName);
        }
        options[optionName] = content;
      }
    }
    return options;
  }

}
