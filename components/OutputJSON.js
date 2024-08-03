export function GenericButton({blockName, component}) {

  const JSONify = () => {
    let storyblokComponent = {};
    storyblokComponent.component = {};
    storyblokComponent.component.schema = {};

    component.forEach((e) => {
      storyblokComponent.component.schema[e.componentName] = {"type" : e.componentType}
    })
    
    storyblokComponent.component.name = blockName;
    storyblokComponent.component.display_name = blockName;

    return JSON.stringify(storyblokComponent);

  }

  return (JSONify(component))
}

export default GenericButton