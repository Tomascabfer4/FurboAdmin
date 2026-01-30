import { useState } from "react";
import { Octokit } from "octokit";
import {
  Save,
  Plus,
  Trash2,
  Globe,
  Lock,
  RefreshCw,
  Zap,
  Play,
  Smartphone,
  Shield,
  LayoutGrid,
} from "lucide-react";

// ⚠️ CONFIGURACIÓN: CAMBIA ESTO POR TUS DATOS
const GITHUB_OWNER = "Tomascabfer4";
const GITHUB_REPO = "FurboVacano";
const FILE_PATH = "furbo-data.json";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("github_token") || "",
  );
  const [data, setData] = useState<any>(null);
  const [sha, setSha] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // 1. CARGAR DATOS
  const loadData = async () => {
    if (!token) return;
    setLoading(true);
    setStatus("Cargando datos...");

    try {
      const octokit = new Octokit({ auth: token });
      const response = await octokit.request(
        `GET /repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      );

      const content = decodeURIComponent(escape(atob(response.data.content)));
      const json = JSON.parse(content);

      // Inicializar arrays si no existen
      if (!json.streamingApps) json.streamingApps = [];
      if (!json.acestreamLists) json.acestreamLists = [];
      if (!json.vpnTools) json.vpnTools = [];
      if (!json.contactSports) json.contactSports = [];
      if (!json.webChannels) json.webChannels = [];

      setData(json);
      setSha(response.data.sha);
      setStatus("");
      localStorage.setItem("github_token", token);
    } catch (error) {
      console.error(error);
      setStatus("Error: Token inválido o archivo no encontrado.");
    } finally {
      setLoading(false);
    }
  };

  // 2. GUARDAR DATOS
  const saveData = async () => {
    if (!token || !data) return;
    setLoading(true);
    setStatus("Guardando en la nube...");

    try {
      const octokit = new Octokit({ auth: token });
      const content = btoa(
        unescape(encodeURIComponent(JSON.stringify(data, null, 2))),
      );

      await octokit.request(
        `PUT /repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
        {
          message: "Actualización desde Furbo Admin 🚀",
          content: content,
          sha: sha,
        },
      );

      setStatus("¡Guardado! La TV se actualizará pronto.");
      await loadData();
    } catch (error: any) {
      console.error(error);
      setStatus("Error al guardar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. FUNCIONES AUXILIARES ---

  const handleFieldChange = (
    category: string,
    index: number,
    field: string,
    value: string,
  ) => {
    const list = [...data[category]];
    list[index] = { ...list[index], [field]: value };
    setData({ ...data, [category]: list });
  };

  const removeItem = (category: string, index: number) => {
    if (!confirm("¿Seguro que quieres borrar este elemento?")) return;
    const list = data[category].filter((_: any, i: number) => i !== index);
    setData({ ...data, [category]: list });
  };

  const addItem = (category: string) => {
    let newItem = {};
    switch (category) {
      case "webChannels":
      case "contactSports":
        newItem = { name: "Nuevo Canal", url: "https://", description: "" };
        break;
      case "streamingApps":
        newItem = {
          title: "Nueva App",
          description: "",
          url: "https://",
          iconName: "play",
          packageName: "",
          color: "from-gray-500 to-gray-700",
          size: "0 MB",
        };
        break;
      case "acestreamLists":
        newItem = {
          title: "Nueva Lista",
          url: "https://",
          iconName: "play",
          description: "",
        };
        break;
      case "vpnTools":
        newItem = {
          title: "Nueva VPN",
          url: "https://",
          description: "",
          iconName: "shield",
        };
        break;
    }
    setData({ ...data, [category]: [newItem, ...data[category]] });
  };

  // --- RENDERIZADO ---

  if (!token || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 font-sans text-slate-100">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full max-w-md text-center shadow-2xl">
          <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6">
            <Lock size={32} className="text-purple-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Furbo Admin</h1>
          <p className="text-slate-400 mb-6 text-sm">
            Introduce tu Token de GitHub para gestionar el contenido.
          </p>
          <input
            type="password"
            placeholder="ghp_xxxxxxxxxxxx"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white mb-4 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button
            onClick={loadData}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-500 py-3 rounded-lg font-bold transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Verificando..." : "Acceder al Panel"}
          </button>
          {status && <p className="text-red-400 mt-4 text-sm">{status}</p>}
        </div>
      </div>
    );
  }

  // Clases comunes para inputs
  const inputClass =
    "w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all placeholder:text-slate-600";
  const labelClass =
    "text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1 block";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-32">
      {/* HEADER */}
      <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <LayoutGrid size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Furbo Admin</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <p className="text-xs text-slate-400 font-mono">
                  {GITHUB_REPO}/{FILE_PATH}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={loadData}
              className="p-2.5 bg-slate-800 rounded-lg hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Recargar datos"
            >
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <button
              onClick={saveData}
              disabled={loading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-green-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </div>

      {/* STATUS BAR */}
      {status && (
        <div className="max-w-5xl mx-auto px-4 mt-6">
          <div
            className={`p-4 rounded-xl text-center font-medium shadow-lg border ${
              status.includes("Error")
                ? "bg-red-500/10 border-red-500/20 text-red-200"
                : "bg-green-500/10 border-green-500/20 text-green-200"
            }`}
          >
            {status}
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 mt-8 space-y-12">
        {/* =========================================
            SECCIÓN 1: CANALES WEB
           ========================================= */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-blue-400">
              <Globe /> Canales Web
            </h2>
            <button
              onClick={() => addItem("webChannels")}
              className="text-sm bg-blue-500/10 text-blue-300 border border-blue-500/20 px-4 py-2 rounded-lg hover:bg-blue-500/20 flex items-center gap-2 transition-all"
            >
              <Plus size={16} /> Añadir Canal
            </button>
          </div>

          <div className="grid gap-4">
            {data.webChannels.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 hover:border-blue-500/30 hover:bg-slate-800 transition-all group relative"
              >
                <div className="flex gap-4 items-start">
                  <span className="hidden sm:flex h-8 w-8 items-center justify-center bg-slate-700/50 rounded-lg text-slate-400 font-mono text-xs shrink-0 mt-1">
                    {i + 1}
                  </span>

                  <div className="flex-1 space-y-4">
                    {/* Fila 1 */}
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className={labelClass}>Nombre del Canal</label>
                        <input
                          className={`${inputClass} font-semibold`}
                          value={item.name}
                          onChange={(e) =>
                            handleFieldChange(
                              "webChannels",
                              i,
                              "name",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="w-24 sm:w-32">
                        <label className={labelClass}>Código</label>
                        <input
                          className={`${inputClass} text-yellow-400 text-center font-mono`}
                          placeholder="-"
                          value={item.accessCode || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              "webChannels",
                              i,
                              "accessCode",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Fila 2 */}
                    <div>
                      <label className={labelClass}>URL (https://...)</label>
                      <input
                        className={`${inputClass} text-blue-300 font-mono text-xs`}
                        value={item.url}
                        onChange={(e) =>
                          handleFieldChange(
                            "webChannels",
                            i,
                            "url",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    {/* Fila 3 */}
                    <div>
                      <label className={labelClass}>
                        Descripción (Opcional)
                      </label>
                      <input
                        className={`${inputClass} text-slate-400 italic`}
                        placeholder="Ej: Solo eventos importantes..."
                        value={item.description || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "webChannels",
                            i,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem("webChannels", i)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors mt-1"
                    title="Borrar"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            SECCIÓN 2: APPS STREAMING
           ========================================= */}
        <section>
          <div className="flex items-center justify-between mb-6 pt-6 border-t border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-purple-400">
              <Smartphone /> Apps y APKs
            </h2>
            <button
              onClick={() => addItem("streamingApps")}
              className="text-sm bg-purple-500/10 text-purple-300 border border-purple-500/20 px-4 py-2 rounded-lg hover:bg-purple-500/20 flex items-center gap-2 transition-all"
            >
              <Plus size={16} /> Añadir App
            </button>
          </div>

          <div className="grid gap-4">
            {data.streamingApps.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 hover:border-purple-500/30 hover:bg-slate-800 transition-all relative"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-1 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Título</label>
                        <input
                          className={`${inputClass} font-bold`}
                          value={item.title}
                          onChange={(e) =>
                            handleFieldChange(
                              "streamingApps",
                              i,
                              "title",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Package Name (Android)
                        </label>
                        <input
                          className={`${inputClass} font-mono text-green-300 text-xs`}
                          placeholder="com.ejemplo.app"
                          value={item.packageName || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              "streamingApps",
                              i,
                              "packageName",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>
                        Enlace de Descarga APK
                      </label>
                      <input
                        className={`${inputClass} text-blue-300 font-mono text-xs`}
                        value={item.url}
                        onChange={(e) =>
                          handleFieldChange(
                            "streamingApps",
                            i,
                            "url",
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className={labelClass}>Icono</label>
                        <input
                          className={inputClass}
                          placeholder="play, tv, zap..."
                          value={item.iconName || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              "streamingApps",
                              i,
                              "iconName",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Color (Tailwind)</label>
                        <input
                          className={`${inputClass} text-xs`}
                          placeholder="from-x to-y..."
                          value={item.color || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              "streamingApps",
                              i,
                              "color",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Tamaño</label>
                        <input
                          className={inputClass}
                          placeholder="20 MB"
                          value={item.size || ""}
                          onChange={(e) =>
                            handleFieldChange(
                              "streamingApps",
                              i,
                              "size",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Descripción</label>
                      <input
                        className={inputClass}
                        value={item.description || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "streamingApps",
                            i,
                            "description",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem("streamingApps", i)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors mt-1"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            SECCIÓN 3: LISTAS ACESTREAM
           ========================================= */}
        <section>
          <div className="flex items-center justify-between mb-6 pt-6 border-t border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-orange-400">
              <Play /> Listas Acestream
            </h2>
            <button
              onClick={() => addItem("acestreamLists")}
              className="text-sm bg-orange-500/10 text-orange-300 border border-orange-500/20 px-4 py-2 rounded-lg hover:bg-orange-500/20 flex items-center gap-2 transition-all"
            >
              <Plus size={16} /> Añadir Lista
            </button>
          </div>

          <div className="grid gap-4">
            {data.acestreamLists.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 hover:border-orange-500/30 hover:bg-slate-800 transition-all flex gap-4 items-start"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className={labelClass}>Título</label>
                      <input
                        className={`${inputClass} font-bold`}
                        value={item.title}
                        onChange={(e) =>
                          handleFieldChange(
                            "acestreamLists",
                            i,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>URL / ID Acestream</label>
                    <input
                      className={`${inputClass} text-blue-300 font-mono text-xs`}
                      value={item.url}
                      onChange={(e) =>
                        handleFieldChange(
                          "acestreamLists",
                          i,
                          "url",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeItem("acestreamLists", i)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            SECCIÓN 4: CONTACT SPORTS
           ========================================= */}
        <section>
          <div className="flex items-center justify-between mb-6 pt-6 border-t border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-red-400">
              <Zap /> Deportes Contacto
            </h2>
            <button
              onClick={() => addItem("contactSports")}
              className="text-sm bg-red-500/10 text-red-300 border border-red-500/20 px-4 py-2 rounded-lg hover:bg-red-500/20 flex items-center gap-2 transition-all"
            >
              <Plus size={16} /> Añadir
            </button>
          </div>

          <div className="grid gap-4">
            {data.contactSports.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 hover:border-red-500/30 hover:bg-slate-800 transition-all flex gap-4 items-start"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className={labelClass}>Nombre</label>
                      <input
                        className={`${inputClass} font-bold`}
                        value={item.name}
                        onChange={(e) =>
                          handleFieldChange(
                            "contactSports",
                            i,
                            "name",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="w-24">
                      <label className={labelClass}>Código</label>
                      <input
                        className={`${inputClass} text-yellow-400 text-center font-mono`}
                        value={item.accessCode || ""}
                        onChange={(e) =>
                          handleFieldChange(
                            "contactSports",
                            i,
                            "accessCode",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>URL</label>
                    <input
                      className={`${inputClass} text-blue-300 font-mono text-xs`}
                      value={item.url}
                      onChange={(e) =>
                        handleFieldChange(
                          "contactSports",
                          i,
                          "url",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeItem("contactSports", i)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================
            SECCIÓN 5: VPN TOOLS
           ========================================= */}
        <section>
          <div className="flex items-center justify-between mb-6 pt-6 border-t border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-400">
              <Shield /> Herramientas VPN
            </h2>
            <button
              onClick={() => addItem("vpnTools")}
              className="text-sm bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-4 py-2 rounded-lg hover:bg-emerald-500/20 flex items-center gap-2 transition-all"
            >
              <Plus size={16} /> Añadir VPN
            </button>
          </div>

          <div className="grid gap-4">
            {data.vpnTools.map((item: any, i: number) => (
              <div
                key={i}
                className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 hover:border-emerald-500/30 hover:bg-slate-800 transition-all flex gap-4 items-start"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className={labelClass}>Nombre VPN</label>
                      <input
                        className={`${inputClass} font-bold`}
                        value={item.title}
                        onChange={(e) =>
                          handleFieldChange(
                            "vpnTools",
                            i,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>URL Descarga</label>
                    <input
                      className={`${inputClass} text-blue-300 font-mono text-xs`}
                      value={item.url}
                      onChange={(e) =>
                        handleFieldChange("vpnTools", i, "url", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Descripción</label>
                    <input
                      className={inputClass}
                      value={item.description || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          "vpnTools",
                          i,
                          "description",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={() => removeItem("vpnTools", i)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 text-center border-t border-slate-800 pt-8 text-slate-500 text-sm">
        <p>Furbo Admin v1.0 • Panel de Control Remoto</p>
      </footer>
    </div>
  );
}

export default App;
