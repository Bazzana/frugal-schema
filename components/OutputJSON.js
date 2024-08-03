export function GenericButton({blockName, component}) {

  const JSONify = () => {
    let storyblokComponent = {};
    storyblokComponent.component = {};
    storyblokComponent.component.schema = {};

    component.forEach((e) => {
      storyblokComponent.component.schema[e.componentName] = {"type" : e.componentType}
      storyblokComponent.component.schema[e.componentName] = {"description" : e.componentDescription}
    })

    storyblokComponent.component.name = blockName.replace(" ", "_").toLowerCase();
    storyblokComponent.component.display_name = blockName;

    return JSON.stringify(storyblokComponent);

  }

  return (JSONify(component))
}

export default GenericButton