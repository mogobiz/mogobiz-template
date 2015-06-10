package com.mogobiz.template

import java.io.InputStreamReader
import javax.script.{Invocable, ScriptEngine, ScriptEngineManager}

object Mustache {
  def apply(template: String, jsonString: String): String = {
    val javaVersion = java.lang.Double.parseDouble(System.getProperty("java.specification.version"))
    val engineName = if(javaVersion < 1.8) "rhino" else "nashorn"

    val manager: ScriptEngineManager = new ScriptEngineManager
    val engineManager: ScriptEngineManager = new ScriptEngineManager
    val engine: ScriptEngine = engineManager.getEngineByName(engineName)
    engine.eval(new InputStreamReader(this.getClass.getResourceAsStream("/template/mustache.js")))
    val invocable: Invocable = engine.asInstanceOf[Invocable]
    val json: AnyRef = engine.eval("JSON")
    val data: AnyRef = invocable.invokeMethod(json, "parse", jsonString)
    val mustache: AnyRef = engine.eval("Mustache")
    invocable.invokeMethod(mustache, "render", template, data).toString
  }

}
