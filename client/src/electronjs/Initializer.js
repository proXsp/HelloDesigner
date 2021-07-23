const GraphEventHandler = require('./GraphEventHandler')
const OSMenuEventHandler = require('./OSMenuEventHandler')

window.EventTrigger = {
  /**
   * trigger event.
   * @param {*} target event target.
   * @param {*} eventName event name.
   * @param {*} data event data.
   * @returns
   */
  trigger: function (target, eventName, data) {
    if (target && target.dispatchEvent) {
      var event = this._createEvent(eventName, data)
      target.dispatchEvent(event)
      return event.data
    }
  },

  /**
   * create event.
   * @param {*} eventName event name.
   * @param {*} data event data.
   * @returns
   */
  _createEvent: function (eventName, data) {
    var event = new CustomEvent(eventName, {
      detail: {
        data: data || {}
      }
    })
    return event
  }
}

new GraphEventHandler().init()
new OSMenuEventHandler().init()
