let widgetBorderColor = "";
let widgetPosition = "";
let widgetInjected = false;

// Fetch widget state from background
browser.runtime.sendMessage({
  target: "background",
  action: "get_widet_state",
  from: "content"
});

// Listen to messages from background or popup
browser.runtime.onMessage.addListener(message => {
  console.log("Message received in content script: ", message);

  if (message.target === "content" && message.action === "set_widget_state") {
    const color = message.color;
    const position = message.position;

    if (!color || !position) {
      console.warn("Incomplete widget settings received:", message);
      return;
    }

    widgetBorderColor = color;
    widgetPosition = position;
    console.log("content script: new color set: ", widgetBorderColor, " new position set: ", widgetPosition);

    if (widgetInjected === false) {
      injectWidget();
    } else {
      updateWidgetStyle();
    }
  }
});

// Create widget once
function injectWidget() {
  const widgetId = 'bw-toggle-widget';

  const widget = document.createElement('div');
  widget.id = widgetId;
  widget.style.position = 'fixed';
  widget.style.bottom = '50px';
  widget.style[widgetPosition] = '20px';
  widget.style.zIndex = '99999999999';
  widget.style.background = '#222';
  widget.style.color = '#fff';
  widget.style.border = `2px solid ${widgetBorderColor === 'green' ? '#4caf50' : '#2196f3'}`;
  widget.style.borderRadius = '5px';
  widget.style.padding = '10px';
  widget.style.fontFamily = 'monospace';
  widget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.5)';

  const button = document.createElement('button');
  button.textContent = 'Toggle B/W';
  button.style.background = '#fff';
  button.style.color = '#000';
  button.style.border = '1px solid #333';
  button.style.borderRadius = '4px';
  button.style.fontSize = '1rem';
  button.style.padding = '0.5rem 1rem';
  button.style.cursor = 'pointer';
  button.style.fontFamily = 'monospace';

  let isBW = false;
  button.onclick = () => {
    document.documentElement.style.filter = isBW ? '' : 'grayscale(100%)';
    isBW = !isBW;
  };

  widget.appendChild(button);
  document.body.appendChild(widget);
  widgetInjected = true;
}

// Update widget if already injected
function updateWidgetStyle() {
  const widget = document.getElementById('bw-toggle-widget');
  if (!widget) return;

  widget.style.border = `2px solid ${widgetBorderColor === 'green' ? '#4caf50' : '#2196f3'}`;
  widget.style.left = '';
  widget.style.right = '';
  widget.style[widgetPosition] = '20px';
}