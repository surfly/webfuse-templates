// Initial values from manifest
let widgetBorderColor = browser.webfuseSession.env.contentPopupColor;
let widgetPosition = browser.webfuseSession.env.contentPopupPosition;

browser.runtime.onMessage.addListener(message => {
    console.log("Message received in background script: ", message);

    if (message.target !== "background") return;

    if (message.action === "get_widet_state") {
        if (message.from === "popup") {
            provideWidgetStatePopup();
        } else if (message.from === "content") {
            provideWidgetStateContent();
        }
    }

    if (message.action === "update_widget_state") {
        if (message.color && message.position) {
            widgetBorderColor = message.color;
            widgetPosition = message.position;
            provideWidgetStateContent(); // Re-send to content
        }
    }
});

// Send current widget state to content script
function provideWidgetStateContent() {
    if (widgetBorderColor && widgetPosition) {
        browser.tabs.sendMessage(null,{
            target: "content",
            action: "set_widget_state",
            color: widgetBorderColor,
            position: widgetPosition
        });
    }
}

// Send current widget state to popup
function provideWidgetStatePopup() {
    if (widgetBorderColor && widgetPosition) {
        browser.runtime.sendMessage({
            target: "popup",
            action: "set_widget_state",
            color: widgetBorderColor,
            position: widgetPosition
        });
    }
}