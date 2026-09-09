// ==========================================
// 1. COMPOSANTE LOGICIELLE : API FAKE DES SERVICES DE NETTOYAGE ET MAINTENANCE
// ==========================================
const TECH_SERVICES_DATA = [
  {
    id: "nettoyage-house",
    name: "Nettoyage Résidentiel & House",
    description: "Services complets d'entretien et de nettoyage pour maisons et appartements. Dépoussiérage minutieux, lavage des sols, vitres, et remise en état après travaux ou déménagement.",
    specs: ["Lavage et lustrage des sols", "Dépoussiérage et désinfection", "Nettoyage des vitres et baies vitrées"],
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",
    localImage: "./images/nettoyage-house.jpg"
  },
  {
    id: "hygiene-generale",
    name: "Hygiène Générale & Désinfection",
    description: "Protocoles rigoureux d'hygiène générale, désinfection profonde, élimination des germes et bactéries pour garantir un environnement sain, sécurisé et irréprochable.",
    specs: ["Désinfection certifiée des locaux", "Traitement anti-allergènes", "Protocoles d'hygiène aux normes"],
    imageUrl: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600",
    localImage: "./images/hygiene-generale.jpg"
  },
  {
    id: "maintenance-batiment",
    name: "Maintenance & Entretien Bâtiment",
    description: "Interventions techniques pour la maintenance préventive et corrective de vos espaces : réparations courantes, plomberie de base, petits travaux d'aménagement et suivi technique.",
    specs: ["Petites réparations et bricolage", "Maintenance préventive des espaces", "Suivi technique et dépannage"],
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600",
    localImage: "./images/maintenance-batiment.jpg"
  },
  {
    id: "bureaux-commerces",
    name: "Nettoyage Bureaux & Locaux Commerciaux",
    description: "Entretien régulier ou ponctuel des espaces professionnels, bureaux, open spaces et commerces pour offrir un cadre de travail propre, accueillant et professionnel à vos clients et salariés.",
    specs: ["Entretien des espaces de travail", "Vidage des corbeilles et tri", "Nettoyage des salles de réunion"],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600",
    localImage: "./images/bureaux-commerces.jpg"
  },
  {
    id: "deratisation-nuisibles",
    name: "Dératisation & Lutte Anti-Nuisibles",
    description: "Solutions professionnelles et sécurisées de désinsectisation et de dératisation pour protéger vos habitations et locaux contre tous types de nuisibles indésirables.",
    specs: ["Traitement anti-nuisibles ciblés", "Dératisation préventive et curative", "Produits conformes et sécurisés"],
    imageUrl: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=600",
    localImage: "./images/deratisation-nuisibles.jpg"
  },
  {
    id: "espaces-verts",
    name: "Entretien Extérieur & Espaces Verts",
    description: "Soin et entretien des abords, nettoyage des cours, terrasses, balcons et des espaces extérieurs pour valoriser l'aspect visuel et l'hygiène globale de votre propriété.",
    specs: ["Nettoyage haute pression terrasses", "Entretien des cours et allées", "Désherbage et propreté extérieure"],
    imageUrl: "https://images.unsplash.com/photo-1558904541-efa873a8760b?w=600",
    localImage: "./images/espaces-verts.jpg"
  }
];

// ==========================================
// 2. FONCTION DE RENDU DYNAMIQUE DE L'INTERFACE DES SERVICES
// ==========================================
function renderTechServices() {
  const gridContainer = document.getElementById('services-grid');
  if (!gridContainer) return;

  // تفريغ لودر الانتظار المؤقت
  gridContainer.innerHTML = '';

  // توليد كروت الخدمات بشكل ديناميكي
  TECH_SERVICES_DATA.forEach((service) => {
    const card = document.createElement('div');
    // تنسيق متناسق مع الخلفية الداكنة والحدود الحمراء عند تمرير الفأرة
    card.className = "bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-red-600 transition-all duration-300 flex flex-col text-left group";

    card.innerHTML = `
      <div class="relative h-56 w-full bg-slate-900 overflow-hidden">
        <!-- نظام جلب الصور الذكي في حال عدم وجود صور محلية -->
        <img src="${service.localImage}" 
             onerror="this.onerror=null; this.src='${service.imageUrl}';" 
             alt="${service.name}" 
             class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105">
        <div class="absolute top-4 left-4 bg-red-600/90 backdrop-blur-md text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md border border-red-400/20">
          <i class="fa-solid fa-sparkles mr-1 text-slate-100"></i> Service Professionnel
        </div>
      </div>
      
      <div class="p-6 flex-grow flex flex-col justify-between">
        <div>
          <h4 class="text-xl font-black text-white mb-3 leading-snug group-hover:text-red-500 transition-colors">${service.name}</h4>
          <p class="text-slate-400 text-sm font-medium leading-relaxed mb-6">${service.description}</p>
        </div>
        
        <div class="mt-auto pt-4 border-t border-slate-800/60">
          <span class="text-xs font-bold text-slate-500 block mb-2">Détails de la prestation :</span>
          <div class="flex flex-wrap gap-1.5">
            ${service.specs.map(spec => `
              <span class="bg-slate-900 text-slate-300 text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-800">
                <i class="fa-solid fa-check text-red-500 mr-1"></i> ${spec}
              </span>
            `).join('')}
          </div>
          
          <a href="#ticket" class="w-full mt-5 text-center bg-slate-900 hover:bg-red-600 border border-slate-800 hover:border-red-500 text-slate-300 hover:text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 text-xs flex items-center justify-center gap-2">
            <i class="fa-solid fa-calendar-check"></i> Demander un Devis pour ce Service
          </a>
        </div>
      </div>
    `;

    gridContainer.appendChild(card);
  });
}

// ==========================================
// 3. ENREGISTREMENT DU SERVICE WORKER
// ==========================================
function registerTechServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('🧹 [Doumdeli Maintenance & Nettoyage] SW d\'accès hors-ligne activé !', reg.scope))
        .catch(err => console.error('⚠️ [Doumdeli Maintenance & Nettoyage] Échec du SW :', err));
    });
  }
}

// تشغيل الدوال فور تحميل المتصفح بالكامل
document.addEventListener('DOMContentLoaded', () => {
  renderTechServices();
  registerTechServiceWorker();
});
