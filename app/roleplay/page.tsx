"use client";

import { useState, CSSProperties } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { INDUSTRIES } from "@/lib/content";
import type { Industry, RoleplayScenario } from "@/lib/content";

// Shared style helpers
const S = {
  label: { fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as CSSProperties["textTransform"] },
  surface: { background: "#E8E4DC", border: "2px solid #D8D4CC" },
  muted: { color: "#888880" },
  accent: { color: "#2B5CE6" },
  btn: (active: boolean) => ({ border: `2px solid ${active ? "#0A0A0A" : "#D8D4CC"}`, background: active ? "#0A0A0A" : "transparent", color: active ? "#F0EDE6" : "#0A0A0A", padding: "6px 14px", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" as CSSProperties["textTransform"] }),
};

// ─── Scenarios Data ───────────────────────────────────────────────────────────

const SCENARIOS: RoleplayScenario[] = [
  {
    id: "nurse-handoff",
    industry: "healthcare",
    title: "Nurse Shift Handoff",
    titleEs: "Traspaso de Turno de Enfermería",
    role: "Registered Nurse",
    roleEs: "Enfermero/a Registrado/a",
    situation: "You are finishing your shift and need to hand off patient information to the incoming nurse.",
    situationEs: "Estás terminando tu turno y debes transferir información del paciente a la enfermera entrante.",
    objective: "Practice professional medical handoff language clearly and completely.",
    objectiveEs: "Practica lenguaje profesional de traspaso médico de forma clara y completa.",
    keyPhrases: ["Patient in Room 3 is stable", "The patient was given medication at 2 PM", "Please monitor for any changes", "There are no pending orders at this time"],
    keyPhrasesEs: ["El paciente en el Cuarto 3 está estable", "Al paciente se le dio medicamento a las 2 PM", "Por favor monitoree cualquier cambio", "No hay órdenes pendientes en este momento"],
    steps: [
      { prompt: "Greet the incoming nurse and introduce the handoff", promptEs: "Saluda a la enfermera entrante e introduce el traspaso", sampleResponse: "Good evening. I'm handing off to you now. Here's a summary of the patients on our floor.", sampleResponseEs: "Buenas tardes. Te estoy haciendo el traspaso ahora. Aquí hay un resumen de los pacientes en nuestro piso." },
      { prompt: "Describe the most critical patient's status", promptEs: "Describe el estado del paciente más crítico", sampleResponse: "The patient in Room 12 had elevated blood pressure at 3 PM. I administered the prescribed medication. Please check vitals again at 7 PM.", sampleResponseEs: "El paciente en el Cuarto 12 tuvo presión alta a las 3 PM. Administré el medicamento recetado. Por favor revise signos vitales nuevamente a las 7 PM." },
      { prompt: "Mention any pending tasks or concerns", promptEs: "Menciona tareas pendientes o preocupaciones", sampleResponse: "There is one pending lab result for the patient in Room 8. Please follow up when it comes in. Otherwise, everything is up to date.", sampleResponseEs: "Hay un resultado de laboratorio pendiente para el paciente en el Cuarto 8. Por favor haga seguimiento cuando llegue. Por lo demás, todo está al día." },
    ],
  },
  {
    id: "forklift-handoff",
    industry: "logistics",
    title: "Warehouse Equipment Check-In",
    titleEs: "Revisión de Equipo en Almacén",
    role: "Forklift Operator",
    roleEs: "Operador de Montacargas",
    situation: "You need to report a maintenance issue with the forklift before your shift ends.",
    situationEs: "Debes reportar un problema de mantenimiento con el montacargas antes de que termine tu turno.",
    objective: "Report equipment issues using precise safety vocabulary.",
    objectiveEs: "Reporta problemas de equipo usando vocabulario de seguridad preciso.",
    keyPhrases: ["I noticed an issue with the equipment", "The left rear tire is low", "I already reported it to maintenance", "The equipment should not be used until repaired"],
    keyPhrasesEs: ["Noté un problema con el equipo", "La llanta trasera izquierda está baja", "Ya lo reporté a mantenimiento", "El equipo no debe usarse hasta ser reparado"],
    steps: [
      { prompt: "Report the equipment problem to your supervisor", promptEs: "Reporta el problema del equipo a tu supervisor", sampleResponse: "I need to flag an issue with forklift number 4. I noticed the left rear tire is running low on pressure. I've already tagged it with a yellow safety card.", sampleResponseEs: "Necesito reportar un problema con el montacargas número 4. Noté que la llanta trasera izquierda tiene presión baja. Ya la marqué con una tarjeta amarilla de seguridad." },
      { prompt: "Confirm the reporting procedure and next steps", promptEs: "Confirma el procedimiento de reporte y los próximos pasos", sampleResponse: "I've completed the incident report in the logbook. The forklift has been moved to Bay 7 and is marked out of service until maintenance clears it.", sampleResponseEs: "Completé el reporte de incidente en la bitácora. El montacargas fue movido a la Bahía 7 y está marcado fuera de servicio hasta que mantenimiento lo autorice." },
    ],
  },
  {
    id: "chef-briefing",
    industry: "restaurant",
    title: "Pre-Service Kitchen Briefing",
    titleEs: "Briefing de Cocina Pre-Servicio",
    role: "Sous Chef",
    roleEs: "Sous Chef",
    situation: "As sous chef, brief your kitchen team on tonight's specials and any changes.",
    situationEs: "Como sous chef, informa a tu equipo de cocina sobre los especiales de esta noche y cualquier cambio.",
    objective: "Deliver a clear and confident kitchen briefing before service.",
    objectiveEs: "Da un briefing de cocina claro y confiado antes del servicio.",
    keyPhrases: ["Tonight's specials are...", "We are 86 on...", "Fire the entrees when...", "Make sure to communicate any issues immediately"],
    keyPhrasesEs: ["Los especiales de esta noche son...", "Nos quedamos sin...", "Manda los platos principales cuando...", "Asegúrate de comunicar cualquier problema de inmediato"],
    steps: [
      { prompt: "Announce tonight's specials to the team", promptEs: "Anuncia los especiales de esta noche al equipo", sampleResponse: "Listen up everyone. Tonight we have two specials: a pan-seared halibut with lemon caper sauce, and a braised short rib with roasted garlic mashed potatoes. Memorize them — guests will ask.", sampleResponseEs: "Atención todos. Esta noche tenemos dos especiales: un fletán sellado en sartén con salsa de alcaparras y limón, y una costilla estofada con puré de papa al ajo asado. Memorícenlos — los clientes preguntarán." },
      { prompt: "Communicate an item that is no longer available (86'd)", promptEs: "Comunica un artículo que ya no está disponible (86'd)", sampleResponse: "We are 86 on the lobster bisque as of now. If any server tries to put in that order, stop them immediately and offer the alternative — the clam chowder.", sampleResponseEs: "Nos quedamos sin la bisque de langosta desde ahora. Si algún mesero intenta tomar esa orden, deténganlo de inmediato y ofrezcan la alternativa — la sopa de almejas." },
    ],
  },
  {
    id: "it-helpdesk",
    industry: "technology",
    title: "IT Help Desk Call",
    titleEs: "Llamada al Soporte de IT",
    role: "IT Support Specialist",
    roleEs: "Especialista de Soporte IT",
    situation: "A coworker calls you with a computer problem they can't solve.",
    situationEs: "Un compañero te llama con un problema de computadora que no puede resolver.",
    objective: "Handle a support call professionally: diagnose, guide, and resolve or escalate.",
    objectiveEs: "Maneja una llamada de soporte profesionalmente: diagnostica, guía y resuelve o escala.",
    keyPhrases: ["Can you describe the issue?", "Have you tried restarting?", "I'm going to remote in to take a look", "I'll escalate this ticket if needed"],
    keyPhrasesEs: ["¿Puedes describir el problema?", "¿Has intentado reiniciar?", "Voy a conectarme de forma remota para revisar", "Escalaré este ticket si es necesario"],
    steps: [
      { prompt: "Answer the help desk call professionally", promptEs: "Contesta la llamada al soporte de manera profesional", sampleResponse: "Thank you for calling IT support. My name is Alex. Can I get your employee ID and a brief description of the issue you're experiencing?", sampleResponseEs: "Gracias por llamar al soporte de IT. Mi nombre es Alex. ¿Me puede dar su ID de empleado y una breve descripción del problema que está experimentando?" },
      { prompt: "Walk the user through a basic troubleshooting step", promptEs: "Guía al usuario a través de un paso básico de solución de problemas", sampleResponse: "Okay, first let's try a simple restart. Please save any open work, then restart the computer. I'll stay on the line while you do that.", sampleResponseEs: "Bien, primero intentemos un reinicio simple. Por favor guarde cualquier trabajo abierto, luego reinicie la computadora. Permaneceré en la línea mientras lo hace." },
      { prompt: "Escalate or resolve the ticket", promptEs: "Escala o resuelve el ticket", sampleResponse: "I've gone ahead and escalated this to a Level 2 ticket. A senior technician will reach out within 2 hours. You'll receive a confirmation email with your ticket number.", sampleResponseEs: "Procedí a escalar esto a un ticket de Nivel 2. Un técnico senior se comunicará dentro de 2 horas. Recibirá un correo de confirmación con su número de ticket." },
    ],
  },
  {
    id: "construction-rfi",
    industry: "construction",
    title: "Requesting a Change Order",
    titleEs: "Solicitar una Orden de Cambio",
    role: "Lead Carpenter",
    roleEs: "Carpintero Principal",
    situation: "The architectural drawings have an error. You need to communicate the issue to the project manager and request a change order before proceeding.",
    situationEs: "Los planos arquitectónicos tienen un error. Debes comunicar el problema al gerente del proyecto y solicitar una orden de cambio antes de continuar.",
    objective: "Practice requesting changes professionally without stopping work unnecessarily.",
    objectiveEs: "Practica solicitar cambios de forma profesional sin detener el trabajo innecesariamente.",
    keyPhrases: ["I need to flag an issue with the drawings", "The dimensions don't match the field conditions", "We need a change order before we proceed", "I want to make sure we're aligned before I continue"],
    keyPhrasesEs: ["Necesito señalar un problema con los planos", "Las dimensiones no coinciden con las condiciones en campo", "Necesitamos una orden de cambio antes de continuar", "Quiero asegurarme de que estamos alineados antes de continuar"],
    steps: [
      { prompt: "Report the drawing discrepancy to the project manager", promptEs: "Reporta la discrepancia en los planos al gerente del proyecto", sampleResponse: "Hey, I need to flag a discrepancy in the drawings before we go any further. The plans show the east wall at 12 feet 4 inches, but the field measurement comes out to 12 feet 9 inches. That's a 5-inch difference.", sampleResponseEs: "Oye, necesito señalar una discrepancia en los planos antes de continuar. Los planos muestran la pared este a 12 pies 4 pulgadas, pero la medida en campo da 12 pies 9 pulgadas. Eso es una diferencia de 5 pulgadas." },
      { prompt: "Explain the impact and request a change order", promptEs: "Explica el impacto y solicita una orden de cambio", sampleResponse: "If I frame to the drawing dimensions, the window rough opening won't line up. I need a change order and a revised drawing before my crew moves forward. I don't want to create a rework situation.", sampleResponseEs: "Si enmarco con las dimensiones del plano, la abertura bruta de la ventana no quedará alineada. Necesito una orden de cambio y un plano revisado antes de que mi cuadrilla avance. No quiero crear una situación de retrabajo." },
      { prompt: "Confirm the agreed solution and timeline", promptEs: "Confirma la solución acordada y el plazo", sampleResponse: "Understood. We'll hold off on the east wall until you get me the revised drawing. My crew can move to the interior framing in the meantime. Can you get me something by end of day?", sampleResponseEs: "Entendido. Esperaremos con la pared este hasta que me traiga el plano revisado. Mi cuadrilla puede moverse al enmarcado interior mientras tanto. ¿Puede tenerme algo para el final del día?" },
    ],
  },
  {
    id: "office-conflict",
    industry: "office",
    title: "Addressing a Workplace Conflict",
    titleEs: "Abordar un Conflicto en el Lugar de Trabajo",
    role: "Team Lead",
    roleEs: "Líder de Equipo",
    situation: "Two team members have a communication conflict affecting project delivery. As team lead, you need to address it professionally.",
    situationEs: "Dos miembros del equipo tienen un conflicto de comunicación que afecta la entrega del proyecto. Como líder de equipo, debes abordarlo profesionalmente.",
    objective: "Use neutral, solution-focused language to resolve workplace tension without taking sides.",
    objectiveEs: "Usa lenguaje neutro y enfocado en soluciones para resolver tensiones laborales sin tomar partido.",
    keyPhrases: ["I want to hear both perspectives", "Let's focus on the project, not the problem", "What can we do differently going forward?", "I appreciate you bringing this to my attention"],
    keyPhrasesEs: ["Quiero escuchar ambas perspectivas", "Enfoquémonos en el proyecto, no en el problema", "¿Qué podemos hacer diferente de ahora en adelante?", "Agradezco que me hayas informado de esto"],
    steps: [
      { prompt: "Open the conversation with both team members neutrally", promptEs: "Abre la conversación con ambos miembros del equipo de forma neutral", sampleResponse: "Thank you both for coming in. I want to be clear — I'm not here to point fingers. I called this meeting because I want us to work well together, and I think we can solve this if we talk it through.", sampleResponseEs: "Gracias a ambos por venir. Quiero ser claro — no estoy aquí para señalar culpables. Llamé a esta reunión porque quiero que trabajemos bien juntos, y creo que podemos resolver esto si lo hablamos." },
      { prompt: "Redirect from blame to solutions", promptEs: "Redirige de la culpa a las soluciones", sampleResponse: "I hear you both, and I understand there's been frustration. But let's shift gears — instead of focusing on what went wrong, let's talk about what we can do differently going forward. What would help you both communicate better?", sampleResponseEs: "Los escucho a ambos y entiendo que ha habido frustración. Pero cambiemos de enfoque — en lugar de centrarnos en lo que salió mal, hablemos de qué podemos hacer diferente de ahora en adelante. ¿Qué les ayudaría a comunicarse mejor?" },
      { prompt: "Close with clear agreements and next steps", promptEs: "Cierra con acuerdos claros y próximos pasos", sampleResponse: "Great. So we're agreed — status updates happen every Monday by noon in the shared doc, and if there's a blocker, you message each other directly before escalating. I'll check in with both of you next Friday to see how it's going.", sampleResponseEs: "Bien. Entonces estamos de acuerdo — las actualizaciones de estado se hacen cada lunes antes del mediodía en el documento compartido, y si hay un bloqueador, se mensajean directamente antes de escalar. Les haré seguimiento a ambos el próximo viernes para ver cómo va." },
    ],
  },
  {
    id: "retail-inventory",
    industry: "retail",
    title: "Opening Shift Inventory Count",
    titleEs: "Conteo de Inventario al Inicio de Turno",
    role: "Shift Supervisor",
    roleEs: "Supervisor de Turno",
    situation: "You're opening the store and need to communicate the day's inventory situation to your team and prepare for a busy weekend.",
    situationEs: "Estás abriendo la tienda y necesitas comunicar la situación de inventario del día a tu equipo y prepararte para un fin de semana ocupado.",
    objective: "Communicate inventory status clearly and assign tasks to your team professionally.",
    objectiveEs: "Comunica el estado del inventario claramente y asigna tareas a tu equipo de manera profesional.",
    keyPhrases: ["We're running low on...", "Please restock the floor from the back", "Flag me if anything is out of stock", "Let's make sure the floor is full before we open"],
    keyPhrasesEs: ["Estamos bajos en...", "Por favor reabastecer el piso desde la bodega", "Avísame si algo está agotado", "Asegurémonos de que el piso esté lleno antes de abrir"],
    steps: [
      { prompt: "Open the shift briefing and highlight low stock items", promptEs: "Abre el briefing del turno y destaca artículos con bajo inventario", sampleResponse: "Good morning team. Before we open, I need everyone's attention for two minutes. Based on last night's sales, we're running low on the blue denim section and the athletic footwear wall. I need those areas restocked before 9 AM.", sampleResponseEs: "Buenos días equipo. Antes de abrir, necesito la atención de todos por dos minutos. Según las ventas de anoche, estamos bajos en la sección de mezclilla azul y el muro de calzado atlético. Necesito que esas áreas sean reabastecidas antes de las 9 AM." },
      { prompt: "Assign specific tasks to team members", promptEs: "Asigna tareas específicas a los miembros del equipo", sampleResponse: "Marcus, can you pull the denim stock from the back and get it on the floor? Jennifer, please handle the footwear. If either of you hit a gap where we're actually out of stock, come flag me right away — don't wait.", sampleResponseEs: "Marcus, ¿puedes sacar el inventario de mezclilla de la bodega y ponerlo en el piso? Jennifer, por favor maneja el calzado. Si alguno de ustedes encuentra que realmente estamos agotados en algo, vengan a avisarme de inmediato — no esperen." },
    ],
  },
  {
    id: "education-substitute",
    industry: "education",
    title: "Substitute Teacher Introduction",
    titleEs: "Presentación del Maestro Sustituto",
    role: "Substitute Teacher",
    roleEs: "Maestro/a Sustituto/a",
    situation: "You are a substitute teacher for a high school class. You need to establish authority and set expectations from the first minute.",
    situationEs: "Eres un maestro sustituto para una clase de preparatoria. Debes establecer autoridad y expectativas desde el primer minuto.",
    objective: "Open a class confidently, set behavioral expectations, and begin the assigned lesson.",
    objectiveEs: "Abre una clase con confianza, establece expectativas de comportamiento y comienza la lección asignada.",
    keyPhrases: ["Please take your seats", "I expect the same respect you give your regular teacher", "The assignment for today is...", "Raise your hand if you have a question"],
    keyPhrasesEs: ["Por favor tomen sus asientos", "Espero el mismo respeto que le dan a su maestro regular", "La tarea de hoy es...", "Levanten la mano si tienen una pregunta"],
    steps: [
      { prompt: "Introduce yourself and establish authority from the start", promptEs: "Preséntate y establece autoridad desde el principio", sampleResponse: "Good morning. My name is Mr. Reyes and I'll be your substitute today. I want to set expectations right away: same rules, same respect as with your regular teacher. Please take your seats and put phones away.", sampleResponseEs: "Buenos días. Me llamo Sr. Reyes y seré su sustituto hoy. Quiero establecer expectativas de inmediato: mismas reglas, mismo respeto que con su maestro regular. Por favor tomen sus asientos y guarden los teléfonos." },
      { prompt: "Present the day's assignment clearly", promptEs: "Presenta la tarea del día claramente", sampleResponse: "Mrs. Johnson left detailed instructions. Today you'll be working on pages 45 through 52 in your textbook — reading the chapter on the Civil Rights Movement and answering the five comprehension questions at the end. This will be collected.", sampleResponseEs: "La Sra. Johnson dejó instrucciones detalladas. Hoy trabajarán en las páginas 45 a 52 de su libro de texto — leyendo el capítulo sobre el Movimiento de Derechos Civiles y respondiendo las cinco preguntas de comprensión al final. Esto será recogido." },
      { prompt: "Handle a student who is off-task", promptEs: "Maneja a un estudiante que no está en tarea", sampleResponse: "Excuse me — I see you're on your phone. I'm going to ask you one time to put it away and get started. If I have to ask again, I'll need to write a referral. I'd rather not do that, so let's keep it simple — phone away, work out. Thank you.", sampleResponseEs: "Perdón — veo que estás en tu teléfono. Te voy a pedir una vez que lo guardes y comiences. Si tengo que pedirlo de nuevo, tendré que escribir un reporte. Prefiero no hacerlo, así que mantengámoslo simple — teléfono guardado, trabajo afuera. Gracias." },
    ],
  },
  {
    id: "hospitality-complaint",
    industry: "hospitality",
    title: "Handling a Guest Complaint",
    titleEs: "Manejar la Queja de un Huésped",
    role: "Guest Services Manager",
    roleEs: "Gerente de Servicios al Huésped",
    situation: "A hotel guest is upset about noise from a nearby room and demands a resolution immediately.",
    situationEs: "Un huésped del hotel está molesto por el ruido de una habitación cercana y exige una resolución de inmediato.",
    objective: "Defuse the complaint, show empathy, and offer a concrete solution without over-promising.",
    objectiveEs: "Desactiva la queja, muestra empatía y ofrece una solución concreta sin prometer demasiado.",
    keyPhrases: ["I completely understand your frustration", "Let me look into this right away", "I want to make this right for you", "Here is what I can do for you tonight"],
    keyPhrasesEs: ["Entiendo completamente su frustración", "Déjeme investigar esto de inmediato", "Quiero resolver esto para usted", "Esto es lo que puedo hacer por usted esta noche"],
    steps: [
      { prompt: "Receive the complaint with empathy and no defensiveness", promptEs: "Recibe la queja con empatía y sin defensividad", sampleResponse: "I sincerely apologize for the disruption, Mr. Kim. You are absolutely right to expect a quiet environment — that is a reasonable expectation at any hotel. I completely understand your frustration.", sampleResponseEs: "Me disculpo sinceramente por la interrupción, Sr. Kim. Tiene toda la razón al esperar un ambiente tranquilo — esa es una expectativa razonable en cualquier hotel. Entiendo completamente su frustración." },
      { prompt: "Offer a concrete solution and take ownership", promptEs: "Ofrece una solución concreta y toma responsabilidad", sampleResponse: "Here is what I'm going to do right now: I'll personally contact the guests in the adjacent room. If the noise continues after that, I'll move you to a complimentary room on a quieter floor — no charge. I want to make this right tonight.", sampleResponseEs: "Esto es lo que voy a hacer ahora mismo: contactaré personalmente a los huéspedes en la habitación adyacente. Si el ruido continúa después de eso, lo cambiaré a una habitación de cortesía en un piso más tranquilo — sin cargo. Quiero resolver esto esta noche." },
      { prompt: "Close the interaction and ensure satisfaction", promptEs: "Cierra la interacción y asegura la satisfacción", sampleResponse: "I'm going to follow up with you personally in 30 minutes to make sure everything is resolved. Here is my direct number — please don't hesitate to call if anything else comes up. Thank you for your patience, Mr. Kim.", sampleResponseEs: "Voy a hacer seguimiento con usted personalmente en 30 minutos para asegurarme de que todo esté resuelto. Aquí está mi número directo — no dude en llamar si surge algo más. Gracias por su paciencia, Sr. Kim." },
    ],
  },
  {
    id: "manufacturing-safety-stop",
    industry: "manufacturing",
    title: "Emergency Line Stop",
    titleEs: "Paro de Línea de Emergencia",
    role: "Machine Operator",
    roleEs: "Operador de Máquina",
    situation: "You notice a dangerous machine malfunction mid-shift and must stop the line and report it following OSHA-compliant procedures.",
    situationEs: "Notas un fallo de máquina peligroso a mitad del turno y debes parar la línea y reportarlo siguiendo los procedimientos OSHA.",
    objective: "Practice emergency stop communication: clear, calm, fast, and by the book.",
    objectiveEs: "Practica la comunicación de paro de emergencia: clara, calmada, rápida y según el procedimiento.",
    keyPhrases: ["I'm stopping the line — safety issue", "The machine is making an unusual noise/movement", "I've engaged the lockout/tagout", "No one should operate this machine until it is cleared"],
    keyPhrasesEs: ["Voy a parar la línea — problema de seguridad", "La máquina está haciendo un ruido/movimiento inusual", "Activé el bloqueo/etiquetado", "Nadie debe operar esta máquina hasta que sea autorizada"],
    steps: [
      { prompt: "Alert the floor supervisor and stop the line", promptEs: "Alerta al supervisor del piso y para la línea", sampleResponse: "Stopping the line now — I have a safety issue on press 7. The machine started making a grinding noise and I noticed the guard plate is loose. I'm not going to operate it until it's inspected.", sampleResponseEs: "Paro la línea ahora — tengo un problema de seguridad en la prensa 7. La máquina empezó a hacer un ruido de raspado y noté que la placa de protección está suelta. No voy a operarla hasta que sea inspeccionada." },
      { prompt: "Describe what happened clearly for the incident report", promptEs: "Describe lo que ocurrió claramente para el reporte de incidente", sampleResponse: "The noise started about 10 minutes ago — around 2:45 PM — right after the last cycle. There was no impact, and no one was injured. I applied the lockout/tagout as soon as I stopped the machine. The affected area is cordoned off.", sampleResponseEs: "El ruido empezó hace unos 10 minutos — alrededor de las 2:45 PM — justo después del último ciclo. No hubo impacto y nadie resultó herido. Apliqué el bloqueo/etiquetado tan pronto como paré la máquina. El área afectada está acordonada." },
    ],
  },
  {
    id: "healthcare-adv-ethics",
    industry: "healthcare",
    title: "Patient Consent and Ethical Concerns",
    titleEs: "Consentimiento del Paciente y Preocupaciones Éticas",
    role: "Registered Nurse",
    roleEs: "Enfermero/a Registrado/a",
    situation: "A patient is refusing a recommended procedure. You must communicate with the patient, document the refusal, and escalate appropriately.",
    situationEs: "Un paciente se niega a un procedimiento recomendado. Debes comunicarte con el paciente, documentar el rechazo y escalar apropiadamente.",
    objective: "Practice navigating patient autonomy while maintaining professional and ethical standards.",
    objectiveEs: "Practica navegar la autonomía del paciente manteniendo estándares profesionales y éticos.",
    keyPhrases: ["I want to make sure you have all the information to make this decision", "You have the right to refuse treatment", "I'll need to document this as an AMA refusal", "I'm going to notify the physician of your decision"],
    keyPhrasesEs: ["Quiero asegurarme de que tenga toda la información para tomar esta decisión", "Tiene el derecho de rechazar el tratamiento", "Necesitaré documentar esto como un rechazo AMA", "Voy a notificar al médico de su decisión"],
    steps: [
      { prompt: "Explain the recommended procedure and its importance without pressuring the patient", promptEs: "Explica el procedimiento recomendado y su importancia sin presionar al paciente", sampleResponse: "Mr. Reyes, the physician has recommended a cardiac catheterization based on your test results. I want to make sure you fully understand what it involves and why the team believes it's necessary before you make your decision.", sampleResponseEs: "Sr. Reyes, el médico ha recomendado un cateterismo cardíaco basado en sus resultados. Quiero asegurarme de que entienda completamente en qué consiste y por qué el equipo cree que es necesario antes de que tome su decisión." },
      { prompt: "Acknowledge the patient's right to refuse and document it correctly", promptEs: "Reconoce el derecho del paciente a rechazar y documéntalo correctamente", sampleResponse: "I completely respect your right to make this decision. However, I'm required to document this as an AMA — Against Medical Advice — refusal. I'll need your signature on this form confirming that we've explained the risks of declining.", sampleResponseEs: "Respeto completamente su derecho a tomar esta decisión. Sin embargo, estoy obligado a documentar esto como un rechazo AMA — Contra el Consejo Médico. Necesitaré su firma en este formulario confirmando que le explicamos los riesgos de rechazar." },
      { prompt: "Escalate to the physician professionally", promptEs: "Escala al médico de manera profesional", sampleResponse: "Dr. Chen, I'm calling to notify you that Mr. Reyes in Room 4 has declined the catheterization procedure. I've completed patient education, documented the refusal, and obtained his AMA signature. He is alert and oriented and made this decision with full understanding of the risks.", sampleResponseEs: "Dra. Chen, la llamo para notificarle que el Sr. Reyes en el Cuarto 4 ha rechazado el procedimiento de cateterismo. Completé la educación del paciente, documenté el rechazo y obtuve su firma AMA. Está alerta y orientado y tomó esta decisión con pleno entendimiento de los riesgos." },
    ],
  },
  {
    id: "construction-adv-inspection",
    industry: "construction",
    title: "City Building Inspection Response",
    titleEs: "Respuesta a Inspección Municipal de Construcción",
    role: "Project Manager",
    roleEs: "Gerente de Proyecto",
    situation: "A city inspector has flagged two non-conformance items during a framing inspection. You must address them professionally and negotiate a re-inspection timeline.",
    situationEs: "Un inspector municipal señaló dos elementos de no conformidad durante una inspección de enmarcado. Debes abordarlos profesionalmente y negociar un cronograma de re-inspección.",
    objective: "Practice managing regulatory interactions with confidence and technical precision.",
    objectiveEs: "Practica manejar interacciones regulatorias con confianza y precisión técnica.",
    keyPhrases: ["Can you walk me through the specific code reference?", "We'll have the corrections completed by...", "I'd like to request a re-inspection for Thursday", "We take code compliance very seriously on this project"],
    keyPhrasesEs: ["¿Puede explicarme la referencia específica del código?", "Tendremos las correcciones completadas para...", "Me gustaría solicitar una re-inspección para el jueves", "Nos tomamos muy en serio el cumplimiento del código en este proyecto"],
    steps: [
      { prompt: "Receive the failed inspection items professionally without arguing", promptEs: "Recibe los elementos fallidos de la inspección profesionalmente sin argumentar", sampleResponse: "Thank you for the inspection, Inspector Morales. I've reviewed both items on the correction notice. Can you walk me through the specific code reference for the double top plate issue? I want to make sure my crew addresses it exactly to spec.", sampleResponseEs: "Gracias por la inspección, Inspector Morales. He revisado ambos elementos en el aviso de corrección. ¿Puede explicarme la referencia específica del código para el problema de la placa superior doble? Quiero asegurarme de que mi cuadrilla lo corrija exactamente según especificación." },
      { prompt: "Commit to a correction timeline and assign responsibility", promptEs: "Comprométete a un plazo de corrección y asigna responsabilidad", sampleResponse: "Understood. We'll have both corrections completed by end of day tomorrow. I'm assigning my lead framer directly to this today. I'll also document the corrections with photos as we work so you have a record before re-inspection.", sampleResponseEs: "Entendido. Tendremos ambas correcciones completadas para el final del día mañana. Estoy asignando directamente a mi enmarcador principal hoy. También documentaré las correcciones con fotos mientras trabajamos para que tenga un registro antes de la re-inspección." },
      { prompt: "Request a re-inspection date and confirm the process", promptEs: "Solicita una fecha de re-inspección y confirma el proceso", sampleResponse: "Once corrections are complete, I'd like to request a re-inspection for Thursday morning if the schedule allows. Is there a specific window I should request through the city portal, or do I call your office directly?", sampleResponseEs: "Una vez completadas las correcciones, me gustaría solicitar una re-inspección para el jueves por la mañana si el calendario lo permite. ¿Hay una ventana específica que deba solicitar a través del portal de la ciudad, o llamo directamente a su oficina?" },
    ],
  },
  {
    id: "restaurant-adv-cost",
    industry: "restaurant",
    title: "Food Cost Review with Ownership",
    titleEs: "Revisión de Costo de Alimentos con la Dirección",
    role: "Executive Chef",
    roleEs: "Chef Ejecutivo",
    situation: "Monthly food cost is 4% above target. You must present the analysis to the owner and propose actionable solutions.",
    situationEs: "El costo de alimentos mensual está un 4% por encima del objetivo. Debes presentar el análisis al propietario y proponer soluciones prácticas.",
    objective: "Practice presenting financial data to leadership and defending operational decisions.",
    objectiveEs: "Practica presentar datos financieros a la dirección y defender decisiones operativas.",
    keyPhrases: ["Our food cost came in at 34% against a 30% target", "The variance is driven primarily by...", "I've identified three levers to bring this back on target", "I'd like your sign-off on these changes before I implement them"],
    keyPhrasesEs: ["Nuestro costo de alimentos llegó al 34% contra un objetivo del 30%", "La variación se debe principalmente a...", "Identifiqué tres palancas para volver al objetivo", "Me gustaría su aprobación en estos cambios antes de implementarlos"],
    steps: [
      { prompt: "Present the food cost data clearly and own the result", promptEs: "Presenta los datos de costo de alimentos claramente y asume el resultado", sampleResponse: "I want to be upfront about June's numbers. Food cost came in at 34.2%, which is 4.2 points above our 30% target. I own that result. The primary driver was a 22% spike in protein costs — specifically beef and salmon — combined with higher-than-projected waste on the new tasting menu items.", sampleResponseEs: "Quiero ser directo sobre los números de junio. El costo de alimentos llegó al 34.2%, que es 4.2 puntos por encima de nuestro objetivo del 30%. Asumo ese resultado. El principal impulsor fue un aumento del 22% en costos de proteínas — específicamente res y salmón — combinado con un desperdicio mayor al proyectado en los nuevos platos del menú de degustación." },
      { prompt: "Propose specific, measurable corrective actions", promptEs: "Propone acciones correctivas específicas y medibles", sampleResponse: "I've identified three levers. First, I'll replace the beef tenderloin with a less expensive cut — braised short rib — which actually tests better with guests. Second, I'll tighten portion control with a new prep checklist. Third, I'll negotiate a fixed-price quarterly contract with our fish supplier to hedge against volatility.", sampleResponseEs: "Identifiqué tres palancas. Primero, reemplazaré el lomo de res con un corte menos costoso — costilla braseada — que de hecho tiene mejor recepción de los clientes. Segundo, ajustaré el control de porciones con una nueva lista de verificación de preparación. Tercero, negociaré un contrato trimestral de precio fijo con nuestro proveedor de pescado para protegernos contra la volatilidad." },
      { prompt: "Request approval and set an accountability checkpoint", promptEs: "Solicita aprobación y establece un punto de control de responsabilidad", sampleResponse: "I'd like your sign-off before I make the menu change — it affects the printed menu, which has a reprint cost. If we execute all three changes, I'm projecting a return to 30–31% by August. Can we schedule a 15-minute check-in at the end of July to review the numbers together?", sampleResponseEs: "Me gustaría su aprobación antes de hacer el cambio de menú — afecta el menú impreso, que tiene un costo de reimpresión. Si ejecutamos los tres cambios, proyecto un retorno al 30–31% para agosto. ¿Podemos programar un check-in de 15 minutos a finales de julio para revisar los números juntos?" },
    ],
  },
  {
    id: "office-adv-performance",
    industry: "office",
    title: "Delivering a Performance Improvement Plan",
    titleEs: "Entregar un Plan de Mejora de Desempeño",
    role: "HR Manager",
    roleEs: "Gerente de Recursos Humanos",
    situation: "You must deliver a Performance Improvement Plan (PIP) to an underperforming employee professionally, empathetically, and legally correctly.",
    situationEs: "Debes entregar un Plan de Mejora de Desempeño (PIP) a un empleado con bajo rendimiento de manera profesional, empática y legalmente correcta.",
    objective: "Practice delivering difficult feedback while protecting both the employee and the company.",
    objectiveEs: "Practica dar retroalimentación difícil mientras protege tanto al empleado como a la empresa.",
    keyPhrases: ["This is a Performance Improvement Plan, not a termination notice", "I want to be direct about what we're seeing", "The goal of this plan is your success", "You have 60 days to demonstrate the improvements outlined here"],
    keyPhrasesEs: ["Este es un Plan de Mejora de Desempeño, no un aviso de terminación", "Quiero ser directo sobre lo que estamos viendo", "El objetivo de este plan es su éxito", "Tiene 60 días para demostrar las mejoras descritas aquí"],
    steps: [
      { prompt: "Open the meeting and state its purpose clearly and compassionately", promptEs: "Abre la reunión y declara su propósito claramente con compasión", sampleResponse: "Thank you for coming in, David. I want to start by being straightforward with you — this is a serious conversation, and I respect you enough to be direct. We've put together a Performance Improvement Plan based on the patterns we've observed over the past quarter. This is not a termination notice. The goal of this plan is your success here.", sampleResponseEs: "Gracias por venir, David. Quiero empezar siendo directo con usted — esta es una conversación seria y le respeto lo suficiente para ser directo. Hemos preparado un Plan de Mejora de Desempeño basado en los patrones que hemos observado durante el último trimestre. Este no es un aviso de terminación. El objetivo de este plan es su éxito aquí." },
      { prompt: "Present the specific performance gaps with documented examples", promptEs: "Presenta las brechas de desempeño específicas con ejemplos documentados", sampleResponse: "The three areas documented in the plan are: first, deadline adherence — we have five instances in the past eight weeks where deliverables were submitted late without prior communication. Second, accuracy — three client-facing reports contained errors that required correction after submission. Third, responsiveness — response time to internal emails has averaged over 48 hours this quarter.", sampleResponseEs: "Las tres áreas documentadas en el plan son: primero, cumplimiento de plazos — tenemos cinco instancias en las últimas ocho semanas donde los entregables se enviaron tarde sin comunicación previa. Segundo, precisión — tres informes para clientes contenían errores que requirieron corrección tras su envío. Tercero, capacidad de respuesta — el tiempo de respuesta a correos internos ha promediado más de 48 horas este trimestre." },
      { prompt: "Explain the 60-day plan, support offered, and consequences", promptEs: "Explica el plan de 60 días, el apoyo ofrecido y las consecuencias", sampleResponse: "You have 60 days to demonstrate the improvements outlined here. We're offering bi-weekly check-ins with me, access to the LinkedIn Learning platform, and a workload review to make sure you're set up for success. I want to be honest with you: if the improvement targets aren't met at the 60-day mark, we would need to have a different conversation. Do you have any questions before we both sign?", sampleResponseEs: "Tiene 60 días para demostrar las mejoras descritas aquí. Ofrecemos check-ins quincenales conmigo, acceso a la plataforma LinkedIn Learning y una revisión de carga de trabajo para asegurarnos de que esté configurado para el éxito. Quiero ser honesto con usted: si los objetivos de mejora no se cumplen a los 60 días, necesitaríamos tener una conversación diferente. ¿Tiene alguna pregunta antes de que ambos firmemos?" },
    ],
  },
  {
    id: "retail-adv-shrink",
    industry: "retail",
    title: "Loss Prevention Investigation Briefing",
    titleEs: "Informe de Investigación de Prevención de Pérdidas",
    role: "Store Manager",
    roleEs: "Gerente de Tienda",
    situation: "Loss prevention data shows a 3% inventory shrink above acceptable threshold. You must brief your team and implement countermeasures.",
    situationEs: "Los datos de prevención de pérdidas muestran un 3% de merma de inventario por encima del umbral aceptable. Debes informar a tu equipo e implementar contramedidas.",
    objective: "Practice presenting loss data objectively and rallying the team around prevention without creating an atmosphere of distrust.",
    objectiveEs: "Practica presentar datos de pérdidas objetivamente y movilizar al equipo hacia la prevención sin crear un ambiente de desconfianza.",
    keyPhrases: ["Our shrink rate came in at 4.8% against a 1.8% benchmark", "The data doesn't tell us the cause — it tells us there's a gap", "Every one of us has a role in inventory integrity", "I want everyone's eyes on this, not just LP's"],
    keyPhrasesEs: ["Nuestra tasa de merma llegó al 4.8% contra un benchmark del 1.8%", "Los datos no nos dicen la causa — nos dicen que hay una brecha", "Cada uno de nosotros tiene un papel en la integridad del inventario", "Quiero los ojos de todos en esto, no solo de LP"],
    steps: [
      { prompt: "Present the shrink data to your team objectively without assigning blame", promptEs: "Presenta los datos de merma a tu equipo objetivamente sin asignar culpa", sampleResponse: "I want to talk about our Q2 inventory results. Our shrink rate came in at 4.8%. Our district benchmark is 1.8%. That gap costs us roughly $18,000 in lost inventory. I want to be clear: shrink has multiple causes — theft, administrative error, vendor discrepancies. The data doesn't tell us the cause yet, it tells us there's a significant gap we need to close together.", sampleResponseEs: "Quiero hablar sobre nuestros resultados de inventario del Q2. Nuestra tasa de merma llegó al 4.8%. El benchmark de nuestro distrito es 1.8%. Esa brecha nos cuesta aproximadamente $18,000 en inventario perdido. Quiero ser claro: la merma tiene múltiples causas — robo, error administrativo, discrepancias con proveedores. Los datos aún no nos dicen la causa, nos dicen que hay una brecha significativa que necesitamos cerrar juntos." },
      { prompt: "Assign specific countermeasures and set accountability checkpoints", promptEs: "Asigna contramedidas específicas y establece puntos de control de responsabilidad", sampleResponse: "Starting this week: all high-value merchandise needs a two-person count at receiving. I'm reinstating daily cycle counts on the top 20 SKUs by shrink risk. Every customer near the electronics wall gets acknowledged within 30 seconds — not just for sales, for deterrence. I want a weekly shrink report on my desk every Monday. This is everyone's responsibility, and I need everyone's eyes on it.", sampleResponseEs: "A partir de esta semana: toda mercancía de alto valor necesita un conteo de dos personas en recepción. Estoy reinstaurando conteos cíclicos diarios en los 20 SKUs principales por riesgo de merma. Cada cliente cerca del muro de electrónica debe ser atendido en 30 segundos — no solo para ventas, sino para disuasión. Quiero un informe semanal de merma en mi escritorio cada lunes. Esta es responsabilidad de todos y necesito los ojos de todos en esto." },
    ],
  },
  {
    id: "technology-adv-postmortem",
    industry: "technology",
    title: "Incident Post-Mortem Meeting",
    titleEs: "Reunión Post-Mortem de Incidente",
    role: "Engineering Lead",
    roleEs: "Líder de Ingeniería",
    situation: "Your team experienced a 3-hour production outage. You must lead the post-mortem meeting following blameless post-mortem principles.",
    situationEs: "Tu equipo experimentó una interrupción de producción de 3 horas. Debes dirigir la reunión post-mortem siguiendo los principios de post-mortem sin culpa.",
    objective: "Practice facilitating a blameless post-mortem that produces actionable improvements, not a blame session.",
    objectiveEs: "Practica facilitar un post-mortem sin culpa que produzca mejoras prácticas, no una sesión de culpas.",
    keyPhrases: ["We're here to learn, not to assign blame", "The system failed, not the person", "What can we change so this can't happen again?", "Every action item needs an owner and a due date"],
    keyPhrasesEs: ["Estamos aquí para aprender, no para asignar culpa", "El sistema falló, no la persona", "¿Qué podemos cambiar para que esto no pueda volver a pasar?", "Cada elemento de acción necesita un responsable y una fecha límite"],
    steps: [
      { prompt: "Open the post-mortem and set a blameless tone", promptEs: "Abre el post-mortem y establece un tono sin culpa", sampleResponse: "Before we start, I want to be explicit about the ground rules for this meeting. This is a blameless post-mortem. We are here to understand what happened and how to prevent it — not to determine who is at fault. Everyone acted with the best information they had at the time. The goal is system improvement, full stop.", sampleResponseEs: "Antes de comenzar, quiero ser explícito sobre las reglas para esta reunión. Este es un post-mortem sin culpa. Estamos aquí para entender qué pasó y cómo prevenirlo — no para determinar quién tiene la culpa. Todos actuaron con la mejor información que tenían en ese momento. El objetivo es la mejora del sistema, punto final." },
      { prompt: "Walk through the timeline and identify contributing factors", promptEs: "Revisa la línea de tiempo e identifica los factores contribuyentes", sampleResponse: "Let's walk through the timeline together. The deploy went out at 14:32. Alerts fired at 14:44 — a 12-minute detection gap. The on-call engineer acknowledged at 14:49. Rollback completed at 17:21. I want to focus on two contributing factors: the missing pre-deploy checklist item for database migration sequencing, and the alert threshold that was set too high to catch early degradation.", sampleResponseEs: "Revisemos la línea de tiempo juntos. El deploy salió a las 14:32. Las alertas se dispararon a las 14:44 — una brecha de detección de 12 minutos. El ingeniero de turno confirmó a las 14:49. El rollback se completó a las 17:21. Quiero enfocarme en dos factores contribuyentes: el elemento faltante de la lista de verificación pre-deploy para la secuencia de migración de base de datos, y el umbral de alerta que estaba demasiado alto para detectar degradación temprana." },
      { prompt: "Assign action items with owners and deadlines", promptEs: "Asigna elementos de acción con responsables y fechas límite", sampleResponse: "We have three action items. First: update the deploy checklist to include migration sequencing verification — owner: Priya, due by end of next sprint. Second: lower the p99 latency alert threshold from 2 seconds to 800ms — owner: Marcus, due this Friday. Third: run a chaos engineering drill to validate rollback speed — owner: me, within 30 days. These go into Jira today. Every action item needs an owner and a due date, or it doesn't exist.", sampleResponseEs: "Tenemos tres elementos de acción. Primero: actualizar la lista de verificación de deploy para incluir verificación de secuenciación de migración — responsable: Priya, para el final del próximo sprint. Segundo: bajar el umbral de alerta de latencia p99 de 2 segundos a 800ms — responsable: Marcus, para este viernes. Tercero: realizar un ejercicio de ingeniería caótica para validar la velocidad de rollback — responsable: yo, en 30 días. Estos van a Jira hoy. Cada elemento de acción necesita un responsable y una fecha límite, o no existe." },
    ],
  },
  {
    id: "logistics-adv-carrier",
    industry: "logistics",
    title: "Carrier Performance Review",
    titleEs: "Revisión de Desempeño del Transportista",
    role: "Logistics Manager",
    roleEs: "Gerente de Logística",
    situation: "A key carrier's on-time delivery rate has dropped to 71%. You must lead the quarterly performance review and issue a corrective action notice.",
    situationEs: "La tasa de entrega a tiempo de un transportista clave ha bajado al 71%. Debes dirigir la revisión trimestral de desempeño y emitir un aviso de acción correctiva.",
    objective: "Practice holding a vendor accountable with data while preserving the business relationship.",
    objectiveEs: "Practica responsabilizar a un proveedor con datos mientras preservas la relación comercial.",
    keyPhrases: ["Our data shows a 71% on-time delivery rate against a 95% SLA", "This is a material breach of your service level agreement", "I need a corrective action plan within 10 business days", "If performance doesn't improve, we'll need to discuss contract consequences"],
    keyPhrasesEs: ["Nuestros datos muestran una tasa de entrega a tiempo del 71% contra un SLA del 95%", "Esto es un incumplimiento material de su acuerdo de nivel de servicio", "Necesito un plan de acción correctiva en 10 días hábiles", "Si el desempeño no mejora, necesitaremos discutir las consecuencias contractuales"],
    steps: [
      { prompt: "Present the performance data clearly and reference the SLA", promptEs: "Presenta los datos de desempeño claramente y referencia el SLA", sampleResponse: "Thank you for joining the call. I want to get right to the data. In Q2, your on-time delivery rate on our account was 71.3%. Our SLA specifies 95%. That 24-point gap impacted 14 of our customer commitments and generated $6,200 in expedite costs that we absorbed. I want to understand what happened on your end before we talk about next steps.", sampleResponseEs: "Gracias por unirse a la llamada. Quiero ir directo a los datos. En el Q2, su tasa de entrega a tiempo en nuestra cuenta fue del 71.3%. Nuestro SLA especifica el 95%. Esa brecha de 24 puntos impactó 14 de nuestros compromisos con clientes y generó $6,200 en costos de envío urgente que absorbimos. Quiero entender qué ocurrió de su parte antes de hablar de los próximos pasos." },
      { prompt: "Issue the corrective action notice formally but professionally", promptEs: "Emite el aviso de acción correctiva formal pero profesionalmente", sampleResponse: "Based on this data, I'm issuing a formal corrective action notice today. I need a written corrective action plan from your operations team within 10 business days. The plan should address root cause, the specific operational changes you're making, and measurable milestones for the next 90 days. Our contract defines material breach at below 85% — you're below that threshold.", sampleResponseEs: "Con base en estos datos, estoy emitiendo un aviso formal de acción correctiva hoy. Necesito un plan de acción correctiva escrito de su equipo de operaciones en 10 días hábiles. El plan debe abordar la causa raíz, los cambios operativos específicos que están haciendo y los hitos medibles para los próximos 90 días. Nuestro contrato define incumplimiento material por debajo del 85% — están por debajo de ese umbral." },
      { prompt: "Leave the door open for the relationship while being firm on consequences", promptEs: "Deja abierta la puerta para la relación siendo firme en las consecuencias", sampleResponse: "I want to be direct: if performance doesn't return to SLA compliance within 90 days, we'll need to invoke the contract remedies, which include volume reallocation to a secondary carrier. That's not what I want — you've been a reliable partner historically, and I'd prefer to solve this together. I'll follow up with the formal CAR document by email this afternoon.", sampleResponseEs: "Quiero ser directo: si el desempeño no regresa al cumplimiento del SLA dentro de 90 días, necesitaremos invocar los remedios contractuales, que incluyen la reasignación de volumen a un transportista secundario. Eso no es lo que quiero — han sido un socio confiable históricamente y prefiero resolver esto juntos. Daré seguimiento con el documento CAR formal por correo esta tarde." },
    ],
  },
  {
    id: "education-adv-iep",
    industry: "education",
    title: "IEP Meeting with Parents",
    titleEs: "Reunión de IEP con Padres",
    role: "Special Education Teacher",
    roleEs: "Maestra de Educación Especial",
    situation: "You are leading an IEP (Individualized Education Program) meeting with a student's parents and multidisciplinary team to review annual goals and placement.",
    situationEs: "Estás dirigiendo una reunión de IEP (Programa de Educación Individualizado) con los padres de un estudiante y el equipo multidisciplinario para revisar los objetivos anuales y la colocación.",
    objective: "Practice leading a legally mandated meeting while balancing family concerns and educational recommendations.",
    objectiveEs: "Practica dirigir una reunión con mandato legal mientras equilibras las preocupaciones de la familia y las recomendaciones educativas.",
    keyPhrases: ["As the parent, you are an equal member of this IEP team", "Let's review each goal and you can tell me how it aligns with what you see at home", "This placement recommendation is based on the least restrictive environment principle", "You have the right to consent to, refuse, or request changes to any part of this plan"],
    keyPhrasesEs: ["Como padre, usted es un miembro igual de este equipo de IEP", "Revisemos cada objetivo y dígame cómo se alinea con lo que ve en casa", "Esta recomendación de colocación se basa en el principio de entorno menos restrictivo", "Tiene el derecho de consentir, rechazar o solicitar cambios a cualquier parte de este plan"],
    steps: [
      { prompt: "Open the IEP meeting by welcoming the parents as equal team members", promptEs: "Abre la reunión de IEP dando la bienvenida a los padres como miembros iguales del equipo", sampleResponse: "Welcome, Mr. and Mrs. Delgado. Thank you for being here today. Before we begin, I want to remind you that as Marcus's parents, you are equal members of this IEP team. Your observations at home are just as important as our assessments at school. Today we'll review Marcus's annual goals, his current progress, and the placement recommendation for next year. Please stop us at any point if you have questions.", sampleResponseEs: "Bienvenidos, Sr. y Sra. Delgado. Gracias por estar aquí hoy. Antes de comenzar, quiero recordarles que como padres de Marcus, son miembros iguales de este equipo de IEP. Sus observaciones en casa son tan importantes como nuestras evaluaciones en la escuela. Hoy revisaremos los objetivos anuales de Marcus, su progreso actual y la recomendación de colocación para el próximo año. Por favor deténganos en cualquier momento si tienen preguntas." },
      { prompt: "Present a goal and invite parent input", promptEs: "Presenta un objetivo e invita la opinión de los padres", sampleResponse: "The first goal addresses reading fluency — Marcus is working toward reading 90 words per minute at grade level by June. He's currently at 62 words per minute, which is an 18-word improvement from his baseline in September. Can you tell me what you're observing at home with his reading? Is he choosing to read independently at all?", sampleResponseEs: "El primer objetivo aborda la fluidez lectora — Marcus está trabajando hacia leer 90 palabras por minuto al nivel de grado para junio. Actualmente está en 62 palabras por minuto, que es una mejora de 18 palabras desde su línea base en septiembre. ¿Puede decirme qué está observando en casa con su lectura? ¿Elige leer de manera independiente?" },
      { prompt: "Explain a placement recommendation using IDEA principles", promptEs: "Explica una recomendación de colocación usando los principios de IDEA", sampleResponse: "For next year, the team is recommending that Marcus remain in the general education classroom for 80% of the school day, with pull-out services for reading and math 4 times per week. Under IDEA, we're required to place students in the least restrictive environment — meaning the setting where Marcus can make progress with appropriate supports, alongside his non-disabled peers as much as possible. Do you have any concerns about this recommendation?", sampleResponseEs: "Para el próximo año, el equipo recomienda que Marcus permanezca en el salón de educación general el 80% del día escolar, con servicios de apoyo para lectura y matemáticas 4 veces por semana. Bajo IDEA, debemos colocar a los estudiantes en el entorno menos restrictivo — es decir, el entorno donde Marcus puede progresar con apoyos apropiados, junto a sus compañeros sin discapacidad tanto como sea posible. ¿Tiene alguna preocupación sobre esta recomendación?" },
    ],
  },
  {
    id: "hospitality-adv-revenue",
    industry: "hospitality",
    title: "Revenue Management Strategy Meeting",
    titleEs: "Reunión de Estrategia de Gestión de Ingresos",
    role: "Revenue Manager",
    roleEs: "Gerente de Ingresos",
    situation: "Occupancy is down 12% vs last year for Q3. You must present your dynamic pricing strategy to the GM and ownership group.",
    situationEs: "La ocupación está 12% por debajo del año pasado para el Q3. Debes presentar tu estrategia de precios dinámicos al GM y al grupo propietario.",
    objective: "Practice presenting data-driven strategy to executives and defending yield management decisions.",
    objectiveEs: "Practica presentar estrategia basada en datos a ejecutivos y defender decisiones de gestión de rendimiento.",
    keyPhrases: ["Our RevPAR is running 14% behind pace", "I recommend we open availability on OTAs with a targeted discount", "The compression dates in August are an opportunity to drive ADR", "Our competitive set is outperforming us on weekend leisure demand"],
    keyPhrasesEs: ["Nuestro RevPAR va un 14% por debajo del ritmo", "Recomiendo abrir disponibilidad en OTAs con un descuento dirigido", "Las fechas de compresión en agosto son una oportunidad para impulsar el ADR", "Nuestro conjunto competitivo nos supera en demanda de ocio de fin de semana"],
    steps: [
      { prompt: "Present the occupancy and revenue gap with competitive context", promptEs: "Presenta la brecha de ocupación e ingresos con contexto competitivo", sampleResponse: "Thank you for the time today. Here's where we stand: through June, our occupancy is 67.3% versus 79.1% last year — a 12-point deficit. Our RevPAR is running at $118, which is 14% behind pace and 9% below our competitive set average. The gap is concentrated on Sunday through Thursday transient business, which is down due to reduced corporate travel in our market.", sampleResponseEs: "Gracias por el tiempo hoy. Aquí es donde estamos: hasta junio, nuestra ocupación es del 67.3% versus el 79.1% del año pasado — un déficit de 12 puntos. Nuestro RevPAR está en $118, que es un 14% por debajo del ritmo y un 9% por debajo del promedio de nuestro conjunto competitivo. La brecha se concentra en el negocio transitorio de domingo a jueves, que está bajo por la reducción de viajes corporativos en nuestro mercado." },
      { prompt: "Recommend a dynamic pricing and distribution strategy", promptEs: "Recomienda una estrategia de precios dinámicos y distribución", sampleResponse: "My recommendation has three components. First, for July's soft midweek nights, I want to open our OTA channels at a 15% discount to stimulate leisure displacement demand — projected to recover 200 room nights. Second, for the August 14–17 compression period around the convention, I recommend we close discounts entirely and push ADR to $189, up from our current $154 floor. Third, I want to launch a direct-booking incentive — free parking plus a $25 dining credit — to shift share from OTA to our own channel and improve net RevPAR by approximately 4 points.", sampleResponseEs: "Mi recomendación tiene tres componentes. Primero, para las noches de mitad de semana flojas de julio, quiero abrir nuestros canales de OTA con un 15% de descuento para estimular la demanda de desplazamiento de ocio — proyectado para recuperar 200 noches de habitación. Segundo, para el período de compresión del 14 al 17 de agosto alrededor de la convención, recomiendo que cerremos los descuentos por completo y subamos el ADR a $189, desde nuestro piso actual de $154. Tercero, quiero lanzar un incentivo de reserva directa — estacionamiento gratis más un crédito de $25 para restaurante — para cambiar participación de OTA a nuestro propio canal y mejorar el RevPAR neto en aproximadamente 4 puntos." },
    ],
  },
  {
    id: "manufacturing-adv-kaizen",
    industry: "manufacturing",
    title: "Kaizen Improvement Presentation",
    titleEs: "Presentación de Mejora Kaizen",
    role: "Process Engineer",
    roleEs: "Ingeniero de Proceso",
    situation: "You led a week-long Kaizen event to reduce cycle time on Line 3. You must present results to plant leadership.",
    situationEs: "Dirigiste un evento Kaizen de una semana para reducir el tiempo de ciclo en la Línea 3. Debes presentar los resultados a la dirección de la planta.",
    objective: "Practice presenting lean manufacturing results with data, crediting the team, and securing resources for implementation.",
    objectiveEs: "Practica presentar resultados de manufactura esbelta con datos, reconociendo al equipo y asegurando recursos para la implementación.",
    keyPhrases: ["The Kaizen team identified 7 waste reduction opportunities", "We reduced cycle time from 42 seconds to 31 seconds — a 26% improvement", "The projected annual savings are $94,000", "To sustain the gains, we need two resources approved today"],
    keyPhrasesEs: ["El equipo Kaizen identificó 7 oportunidades de reducción de desperdicio", "Redujimos el tiempo de ciclo de 42 segundos a 31 segundos — una mejora del 26%", "Los ahorros anuales proyectados son $94,000", "Para mantener las ganancias, necesitamos dos recursos aprobados hoy"],
    steps: [
      { prompt: "Open the presentation by crediting the team and framing the results", promptEs: "Abre la presentación reconociendo al equipo y enmarcando los resultados", sampleResponse: "Thank you for the time today. Before I present the numbers, I want to acknowledge the five operators from Line 3 who participated in this Kaizen event — they were the experts in the room, and these results belong to them. Over five days, the team mapped the current state, identified 7 waste reduction opportunities across transportation, waiting, and motion categories, and designed a future state that we piloted on Friday.", sampleResponseEs: "Gracias por el tiempo hoy. Antes de presentar los números, quiero reconocer a los cinco operadores de la Línea 3 que participaron en este evento Kaizen — ellos fueron los expertos en la sala y estos resultados les pertenecen. En cinco días, el equipo mapeó el estado actual, identificó 7 oportunidades de reducción de desperdicio en las categorías de transporte, espera y movimiento, y diseñó un estado futuro que piloteamos el viernes." },
      { prompt: "Present the quantified results clearly", promptEs: "Presenta los resultados cuantificados claramente", sampleResponse: "The results: cycle time on Line 3 dropped from 42 seconds per unit to 31 seconds — a 26% reduction. At our current production volume, that translates to 47 additional units per shift. Annualized, we're projecting $94,000 in labor productivity savings and a 12% reduction in WIP inventory carrying cost. We also eliminated two steps that were identified as ergonomic risk factors, which has an additional safety benefit.", sampleResponseEs: "Los resultados: el tiempo de ciclo en la Línea 3 bajó de 42 segundos por unidad a 31 segundos — una reducción del 26%. Con nuestro volumen de producción actual, eso se traduce en 47 unidades adicionales por turno. Anualizado, proyectamos $94,000 en ahorros de productividad laboral y una reducción del 12% en el costo de inventario WIP. También eliminamos dos pasos identificados como factores de riesgo ergonómico, lo que tiene un beneficio de seguridad adicional." },
      { prompt: "Request specific resources needed to sustain the improvement", promptEs: "Solicita recursos específicos necesarios para mantener la mejora", sampleResponse: "To sustain these gains, we need two approvals today. First, $3,200 for shadow boards and 5S supplies to standardize the new workstation layout — without standardization, we'll drift back within 60 days. Second, 4 hours of downtime next Tuesday to permanently relocate the parts bin, which is the single biggest change in the new layout. The ROI on both items is recovered in less than 3 weeks of production. Can we get these approved before we leave the room?", sampleResponseEs: "Para mantener estas ganancias, necesitamos dos aprobaciones hoy. Primero, $3,200 para tableros de sombras y suministros 5S para estandarizar el nuevo diseño de la estación de trabajo — sin estandarización, regresaremos al estado anterior en 60 días. Segundo, 4 horas de tiempo de inactividad el próximo martes para reubicar permanentemente el contenedor de piezas, que es el cambio más grande en el nuevo diseño. El ROI de ambos elementos se recupera en menos de 3 semanas de producción. ¿Podemos obtener estas aprobaciones antes de salir de la sala?" },
    ],
  },
];

// ─── Industry Tips ────────────────────────────────────────────────────────────

const INDUSTRY_TIPS: Partial<Record<Industry, { tip: string; tipEs: string }>> = {
  healthcare: { tip: "Always use clear, calm language. Avoid abbreviations when handing off critical patient info.", tipEs: "Usa siempre un lenguaje claro y calmado. Evita abreviaturas al transferir información crítica del paciente." },
  logistics: { tip: "Safety language must be direct and unambiguous. Use exact equipment IDs and location codes.", tipEs: "El lenguaje de seguridad debe ser directo e inequívoco. Usa IDs de equipo exactos y códigos de ubicación." },
  restaurant: { tip: "Kitchen communication is fast-paced. Use short, loud, clear phrases. '86' means you're out of something.", tipEs: "La comunicación en cocina es rápida. Usa frases cortas, fuertes y claras. '86' significa que ya no tienes algo." },
  technology: { tip: "Stay patient and avoid jargon with non-technical users. Confirm understanding at each step.", tipEs: "Mantén la paciencia y evita la jerga con usuarios no técnicos. Confirma la comprensión en cada paso." },
  construction: { tip: "In US construction, speak up early about problems. A change order protects everyone. Never proceed on a discrepancy without documentation.", tipEs: "En construcción en EE.UU., señala los problemas temprano. Una orden de cambio protege a todos. Nunca avances con una discrepancia sin documentación." },
  office: { tip: "Use 'I' statements and future-focused language in conflict resolution. Avoid blame language — it shuts down dialogue.", tipEs: "Usa declaraciones con 'I' y lenguaje orientado al futuro en la resolución de conflictos. Evita el lenguaje de culpa — cierra el diálogo." },
  retail: { tip: "Short, clear task assignments keep the floor running. Always pair an instruction with a 'flag me if' — it empowers your team.", tipEs: "Las asignaciones de tareas cortas y claras mantienen el piso funcionando. Siempre acompaña una instrucción con un 'avísame si' — empodera a tu equipo." },
  education: { tip: "In US classrooms, establish rules in the first 30 seconds. Calm, specific redirects ('phone away, work out') are more effective than general warnings.", tipEs: "En salones de EE.UU., establece reglas en los primeros 30 segundos. Las redirecciones calmadas y específicas son más efectivas que advertencias generales." },
  hospitality: { tip: "The LAST model: Listen, Apologize, Solve, Thank. Never argue with a guest, even if they are wrong. Ownership and speed of resolution are everything.", tipEs: "El modelo LAST: Escuchar, Disculparse, Solucionar, Agradecer. Nunca discutas con un huésped, aunque estén equivocados. La propiedad y la velocidad de resolución lo son todo." },
  manufacturing: { tip: "Lockout/Tagout (LOTO) is federal law. When stopping a machine for safety, always say 'I've applied LOTO' — it shows compliance and protects you.", tipEs: "Bloqueo/Etiquetado (LOTO) es ley federal. Al parar una máquina por seguridad, siempre di 'Apliqué LOTO' — muestra cumplimiento y te protege." },
};

// ─── Component ───────────────────────────────────────────────────────────────

type ScenarioLevel = "beginner" | "advanced";
const scenarioLevel = (id: string): ScenarioLevel => id.includes("-adv-") ? "advanced" : "beginner";

export default function RoleplayPage() {
  const { lang, toggleLang, completeScenario, completedScenarios, profile } = useAppStore();
  const [filterIndustry, setFilterIndustry] = useState<Industry | null>(profile?.industry ?? null);
  const [filterLevel, setFilterLevel]       = useState<ScenarioLevel | null>(null);
  const [selected, setSelected] = useState<RoleplayScenario | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const es = lang === "es";

  const filtered = SCENARIOS.filter((s) => {
    if (filterIndustry && s.industry !== filterIndustry) return false;
    if (filterLevel    && scenarioLevel(s.id) !== filterLevel) return false;
    return true;
  });

  function openScenario(s: RoleplayScenario) {
    setSelected(s);
    setRevealed(new Array(s.steps.length).fill(false));
    setDone(completedScenarios.includes(s.id));
  }

  function revealStep(i: number) {
    setRevealed((prev) => { const next = [...prev]; next[i] = true; return next; });
  }

  function handleComplete() {
    if (selected) { completeScenario(selected.id); setDone(true); }
  }

  const tip = selected ? INDUSTRY_TIPS[selected.industry] : null;
  const revealedCount = revealed.filter(Boolean).length;
  const allRevealed = selected ? revealedCount === selected.steps.length : false;

  // ── Detail view ────────────────────────────────────────────────────────────
  if (selected) {
    return (
      <div style={{ background: "#F0EDE6", minHeight: "100vh", color: "#0A0A0A" }}>
        {/* Nav */}
        <div style={{ borderBottom: "2px solid #D8D4CC", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setSelected(null)} style={{ background: "none", border: "2px solid #D8D4CC", padding: "6px 14px", fontSize: "13px", cursor: "pointer", fontWeight: 600, letterSpacing: "0.04em" }}>
            ← {es ? "Volver" : "Back"}
          </button>
          <span style={{ fontWeight: 800, fontSize: "15px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            {es ? selected.titleEs : selected.title}
          </span>
          <button onClick={toggleLang} style={{ background: "#0A0A0A", color: "#F0EDE6", border: "none", padding: "6px 14px", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>
            {lang.toUpperCase()}
          </button>
        </div>

        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 24px" }}>
          {/* Role + Industry */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap" }}>
            <span style={{ border: "2px solid #2B5CE6", color: "#2B5CE6", padding: "4px 12px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {es ? selected.roleEs : selected.role}
            </span>
            <span style={{ border: "2px solid #888880", color: "#888880", padding: "4px 12px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              {INDUSTRIES.find((i) => i.id === selected.industry)?.icon} {es ? INDUSTRIES.find((i) => i.id === selected.industry)?.labelEs : INDUSTRIES.find((i) => i.id === selected.industry)?.label}
            </span>
          </div>

          {/* Situation */}
          <div style={{ background: "#E8E4DC", border: "2px solid #D8D4CC", padding: "20px 24px", marginBottom: "24px" }}>
            <div style={{ ...S.label, ...S.muted, marginBottom: "8px" }}>{es ? "Situación" : "Situation"}</div>
            <p style={{ margin: "0 0 8px", fontSize: "15px", lineHeight: 1.6 }}>{es ? selected.situationEs : selected.situation}</p>
            <p style={{ margin: 0, fontSize: "14px", color: "#888880", lineHeight: 1.5 }}>{es ? selected.situation : selected.situationEs}</p>
          </div>

          {/* Objective */}
          <div style={{ borderLeft: "4px solid #2B5CE6", paddingLeft: "16px", marginBottom: "24px" }}>
            <div style={{ ...S.label, ...S.accent, marginBottom: "4px" }}>{es ? "Objetivo" : "Objective"}</div>
            <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.6 }}>{es ? selected.objectiveEs : selected.objective}</p>
          </div>

          {/* Key Phrases */}
          <div style={{ border: "2px solid #D8D4CC", padding: "20px 24px", marginBottom: "32px" }}>
            <div style={{ ...S.label, ...S.muted, marginBottom: "14px" }}>{es ? "Frases Clave" : "Key Phrases"}</div>
            <div style={{ display: "grid", gap: "10px" }}>
              {selected.keyPhrases.map((phrase, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ width: "20px", height: "20px", background: "#2B5CE6", color: "#fff", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>{i + 1}</span>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600 }}>{phrase}</div>
                    {selected.keyPhrasesEs[i] && <div style={{ fontSize: "13px", color: "#888880" }}>{selected.keyPhrasesEs[i]}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div style={{ ...S.label, ...S.muted, marginBottom: "16px" }}>
            {es ? "Práctica Paso a Paso" : "Step-by-Step Practice"} — {revealedCount}/{selected.steps.length}
          </div>

          {/* Progress bar */}
          <div style={{ height: "4px", background: "#D8D4CC", marginBottom: "24px" }}>
            <div style={{ height: "100%", background: "#2B5CE6", width: `${selected.steps.length ? (revealedCount / selected.steps.length) * 100 : 0}%`, transition: "width 0.3s" }} />
          </div>

          <div style={{ display: "grid", gap: "16px", marginBottom: "32px" }}>
            {selected.steps.map((step, i) => {
              const isRevealed = revealed[i];
              return (
                <div key={i} style={{ border: `2px solid ${isRevealed ? "#0A0A0A" : "#D8D4CC"}`, background: isRevealed ? "#0A0A0A" : "#E8E4DC", padding: "20px 24px" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: isRevealed ? "16px" : "0" }}>
                    <span style={{ width: "24px", height: "24px", background: isRevealed ? "#2B5CE6" : "#888880", color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.5, color: isRevealed ? "#F0EDE6" : "#0A0A0A" }}>{es ? step.promptEs : step.prompt}</div>
                      {!isRevealed && <div style={{ fontSize: "13px", color: "#888880", marginTop: "4px" }}>{es ? step.prompt : step.promptEs}</div>}
                    </div>
                    {!isRevealed && (
                      <button onClick={() => revealStep(i)} style={{ background: "#2B5CE6", color: "#fff", border: "none", padding: "6px 14px", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.04em", flexShrink: 0 }}>
                        {es ? "Ver Respuesta" : "Show Sample"}
                      </button>
                    )}
                  </div>
                  {isRevealed && (
                    <div style={{ borderTop: "1px solid #333", paddingTop: "16px" }}>
                      <div style={{ ...S.label, ...S.muted, marginBottom: "8px" }}>{es ? "Respuesta de Ejemplo" : "Sample Response"}</div>
                      <p style={{ margin: "0 0 8px", fontSize: "14px", lineHeight: 1.7, color: "#F0EDE6" }}>{es ? step.sampleResponseEs : step.sampleResponse}</p>
                      <p style={{ margin: 0, fontSize: "13px", color: "#888880", lineHeight: 1.6 }}>{es ? step.sampleResponse : step.sampleResponseEs}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tip */}
          {tip && (
            <div style={{ border: "2px solid #D8D4CC", borderLeft: "4px solid #888880", padding: "16px 20px", marginBottom: "32px" }}>
              <div style={{ ...S.label, ...S.muted, marginBottom: "6px" }}>{es ? "Consejo Profesional" : "Professional Tip"}</div>
              <p style={{ margin: "0 0 6px", fontSize: "14px", lineHeight: 1.6 }}>{es ? tip.tipEs : tip.tip}</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#888880", lineHeight: 1.5 }}>{es ? tip.tip : tip.tipEs}</p>
            </div>
          )}

          {/* Complete button */}
          {done ? (
            <div style={{ background: "#E8E4DC", border: "2px solid #D8D4CC", padding: "16px 24px", textAlign: "center", fontWeight: 700, fontSize: "14px", letterSpacing: "0.06em" }}>
              ✓ {es ? "Completado — +30 XP" : "Completed — +30 XP"}
            </div>
          ) : (
            <button
              onClick={handleComplete}
              disabled={!allRevealed}
              style={{ width: "100%", background: allRevealed ? "#0A0A0A" : "#D8D4CC", color: allRevealed ? "#F0EDE6" : "#888880", border: "none", padding: "16px 24px", fontSize: "14px", fontWeight: 700, cursor: allRevealed ? "pointer" : "not-allowed", letterSpacing: "0.06em", textTransform: "uppercase" }}
            >
              {allRevealed ? (es ? "Completar Roleplay — +30 XP" : "Complete Roleplay — +30 XP") : (es ? `Revela todos los pasos para completar (${revealedCount}/${selected.steps.length})` : `Reveal all steps to complete (${revealedCount}/${selected.steps.length})`)}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── List view ───────────────────────────────────────────────────────────────
  return (
    <div style={{ background: "#F0EDE6", minHeight: "100vh", color: "#0A0A0A" }}>
      {/* Nav */}
      <div style={{ borderBottom: "2px solid #D8D4CC", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#0A0A0A", border: "2px solid #D8D4CC", padding: "6px 14px", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em" }}>
          ← {es ? "Inicio" : "Home"}
        </Link>
        <div>
          <div style={{ fontWeight: 900, fontSize: "18px", letterSpacing: "0.06em", textTransform: "uppercase", textAlign: "center" }}>{es ? "Roleplay por Industria" : "Industry Roleplay"}</div>
          <div style={{ fontSize: "12px", color: "#888880", letterSpacing: "0.04em", textAlign: "center" }}>{es ? "Practica situaciones reales del trabajo" : "Practice real workplace situations"}</div>
        </div>
        <button onClick={toggleLang} style={{ background: "#0A0A0A", color: "#F0EDE6", border: "none", padding: "6px 14px", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em" }}>
          {lang.toUpperCase()}
        </button>
      </div>

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 24px" }}>
        {/* Industry filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
          <button onClick={() => setFilterIndustry(null)} style={S.btn(filterIndustry === null)}>
            {es ? "Todas" : "All"}
          </button>
          {INDUSTRIES.map((ind) => {
            const hasScenario = SCENARIOS.some((s) => s.industry === ind.id);
            if (!hasScenario) return null;
            const active = filterIndustry === ind.id;
            return (
              <button key={ind.id} onClick={() => setFilterIndustry(ind.id)} style={{ border: `2px solid ${active ? "#2B5CE6" : "#D8D4CC"}`, background: active ? "#2B5CE6" : "transparent", color: active ? "#fff" : "#0A0A0A", padding: "6px 14px", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {ind.icon} {es ? ind.labelEs : ind.label}
              </button>
            );
          })}
        </div>

        {/* Level filter */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px", paddingBottom: "20px", borderBottom: "1px solid #D8D4CC" }}>
          <button onClick={() => setFilterLevel(null)} style={S.btn(filterLevel === null)}>
            {es ? "Todos los Niveles" : "All Levels"}
          </button>
          <button onClick={() => setFilterLevel("beginner")} style={{ border: `2px solid #22863a`, background: filterLevel === "beginner" ? "#22863a" : "transparent", color: filterLevel === "beginner" ? "#fff" : "#22863a", padding: "6px 14px", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
            {es ? "Básico" : "Beginner"}
          </button>
          <button onClick={() => setFilterLevel("advanced")} style={{ border: `2px solid #c0392b`, background: filterLevel === "advanced" ? "#c0392b" : "transparent", color: filterLevel === "advanced" ? "#fff" : "#c0392b", padding: "6px 14px", fontSize: "12px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>
            {es ? "Avanzado" : "Advanced"}
          </button>
        </div>

        {/* Cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
          {filtered.map((s) => {
            const ind = INDUSTRIES.find((i) => i.id === s.industry);
            const isCompleted = completedScenarios.includes(s.id);
            return (
              <button key={s.id} onClick={() => openScenario(s)} style={{ background: "#E8E4DC", border: `2px solid ${isCompleted ? "#2B5CE6" : "#D8D4CC"}`, padding: "20px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: "10px", position: "relative" }}>
                {isCompleted && <span style={{ position: "absolute", top: "12px", right: "12px", background: "#2B5CE6", color: "#fff", fontSize: "11px", fontWeight: 700, padding: "2px 8px", letterSpacing: "0.06em" }}>✓ {es ? "HECHO" : "DONE"}</span>}
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ind ? "#888880" : "#888880" }}>
                  {ind?.icon} {es ? ind?.labelEs : ind?.label}
                </div>
                <div style={{ fontWeight: 800, fontSize: "16px", lineHeight: 1.3 }}>{es ? s.titleEs : s.title}</div>
                <div style={{ fontSize: "13px", color: "#888880", fontWeight: 400 }}>{es ? s.title : s.titleEs}</div>
                <div style={{ border: "1px solid #D8D4CC", padding: "4px 10px", fontSize: "12px", fontWeight: 600, color: "#2B5CE6", alignSelf: "flex-start" }}>
                  {es ? s.roleEs : s.role}
                </div>
                <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "12px", color: "#888880" }}>
                    {s.steps.length} {es ? "pasos" : "steps"}
                  </span>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "2px 8px", letterSpacing: "0.06em", textTransform: "uppercase" as const, border: `1.5px solid ${scenarioLevel(s.id) === "advanced" ? "#c0392b" : "#22863a"}`, color: scenarioLevel(s.id) === "advanced" ? "#c0392b" : "#22863a" }}>
                    {scenarioLevel(s.id) === "advanced" ? (es ? "Avanzado" : "Advanced") : (es ? "Básico" : "Beginner")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#888880", fontSize: "14px" }}>
            {es ? "No hay escenarios para esta industria aún." : "No scenarios for this industry yet."}
          </div>
        )}
      </div>
    </div>
  );
}
