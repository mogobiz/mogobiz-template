package com.mogobiz.template

import java.io.InputStreamReader
import javax.script.{Invocable, ScriptEngine, ScriptEngineManager}

/**
 * Created by hayssams on 27/11/14.
 */
object Mustache {
  def apply(template: String, jsonString: String): String = {
    val manager: ScriptEngineManager = new ScriptEngineManager
    val engineManager: ScriptEngineManager = new ScriptEngineManager
    val engine: ScriptEngine = engineManager.getEngineByName("rhino")
    engine.eval(new InputStreamReader(this.getClass.getResourceAsStream("/template/mustache.js")))
    val invocable: Invocable = engine.asInstanceOf[Invocable]
    val json: AnyRef = engine.eval("JSON")
    val data: AnyRef = invocable.invokeMethod(json, "parse", jsonString)
    val mustache: AnyRef = engine.eval("Mustache")
    invocable.invokeMethod(mustache, "render", template, data).toString
  }

}
