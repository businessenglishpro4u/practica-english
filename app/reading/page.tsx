"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { INDUSTRIES } from "@/lib/content";
import type { ReadingExercise, ReadingQuestion } from "@/lib/content";

// ─── Inline data ────────────────────────────────────────────────────────────
const READINGS: ReadingExercise[] = [
  {
    id: "email-001",
    industry: "office",
    type: "email",
    title: "Performance Review Email",
    titleEs: "Correo de Evaluación de Desempeño",
    content:
      "Subject: Your Q3 Performance Review – Scheduled for Friday\n\nDear Marcus,\n\nI hope this message finds you well. I wanted to reach out to schedule your quarterly performance review. Based on your work over the past three months, I have some positive feedback to share, as well as a few areas we can work on together.\n\nThe review will take place this Friday, June 20th, at 2:00 PM in Conference Room B. The meeting should last approximately 45 minutes.\n\nPlease come prepared with:\n- A summary of your key accomplishments this quarter\n- Any challenges or obstacles you've encountered\n- Your goals for the upcoming quarter\n\nIf you have any scheduling conflicts, please let me know by Wednesday so we can find an alternative time.\n\nLooking forward to our conversation.\n\nBest regards,\nSarah Chen\nOperations Manager",
    contentEs:
      "Asunto: Tu Evaluación de Desempeño del Q3 – Programada para el Viernes\n\nEstimado Marcus,\n\nEspero que este mensaje te encuentre bien. Quería comunicarme para programar tu evaluación de desempeño trimestral. Basándome en tu trabajo de los últimos tres meses, tengo comentarios positivos que compartir, así como algunas áreas en las que podemos trabajar juntos.\n\nLa evaluación se llevará a cabo este viernes 20 de junio a las 2:00 PM en la Sala de Conferencias B. La reunión durará aproximadamente 45 minutos.\n\nPor favor ven preparado con:\n- Un resumen de tus logros clave de este trimestre\n- Cualquier desafío u obstáculo que hayas enfrentado\n- Tus metas para el próximo trimestre\n\nSi tienes algún conflicto de horario, por favor avísame el miércoles para encontrar una hora alternativa.\n\nEspero nuestra conversación.\n\nAtentamente,\nSarah Chen\nGerente de Operaciones",
    questions: [
      {
        question: "What is the main purpose of this email?",
        questionEs: "¿Cuál es el propósito principal de este correo?",
        options: ["To fire Marcus", "To schedule a performance review", "To announce a company meeting", "To request vacation time"],
        correct: 1,
      },
      {
        question: "When and where will the review take place?",
        questionEs: "¿Cuándo y dónde será la evaluación?",
        options: ["Thursday at 3 PM, Room A", "Friday at 2 PM, Conference Room B", "Monday at 10 AM, Manager's office", "Wednesday at noon, Room C"],
        correct: 1,
      },
      {
        question: "What should Marcus bring to the meeting?",
        questionEs: "¿Qué debe traer Marcus a la reunión?",
        options: ["His resignation letter", "A list of complaints", "Key accomplishments, challenges, and goals", "Only his ID badge"],
        correct: 2,
      },
    ],
  },
  {
    id: "memo-001",
    industry: "construction",
    type: "memo",
    title: "Safety Protocol Update",
    titleEs: "Actualización de Protocolo de Seguridad",
    content:
      "MEMORANDUM\n\nTO: All Field Personnel\nFROM: Robert Martinez, Safety Director\nDATE: June 17, 2026\nRE: Updated PPE Requirements — Effective Immediately\n\nEffective today, all personnel working on the Northgate Bridge project are required to wear high-visibility vests at all times while on site. This applies to all workers, supervisors, and visitors without exception.\n\nAdditionally, please note the following updates:\n\n1. Hard hats must now meet ANSI Class E standards (electrical protection)\n2. Steel-toed boots are mandatory in all active work zones\n3. Safety glasses must be worn when operating any power tool\n\nAll personnel must complete the updated safety training module by June 30th. Access the training via the company portal using your employee ID.\n\nFailure to comply with these requirements may result in removal from the job site.\n\nQuestions? Contact the Safety Office at ext. 4402.\n\nRobert Martinez\nSafety Director",
    contentEs:
      "MEMORÁNDUM\n\nPARA: Todo el Personal de Campo\nDE: Robert Martínez, Director de Seguridad\nFECHA: 17 de junio de 2026\nRE: Requisitos de EPP Actualizados — Efectivo de Inmediato\n\nA partir de hoy, todo el personal que trabaje en el proyecto del Puente Northgate debe usar chalecos de alta visibilidad en todo momento mientras esté en el sitio. Esto aplica a todos los trabajadores, supervisores y visitantes sin excepción.\n\nAdicional, tenga en cuenta las siguientes actualizaciones:\n\n1. Los cascos deben cumplir ahora con los estándares ANSI Clase E (protección eléctrica)\n2. Las botas con puntera de acero son obligatorias en todas las zonas de trabajo activas\n3. Los lentes de seguridad deben usarse al operar cualquier herramienta eléctrica\n\nTodo el personal debe completar el módulo de capacitación de seguridad actualizado antes del 30 de junio. Acceda a la capacitación a través del portal de la empresa usando su ID de empleado.\n\nEl incumplimiento de estos requisitos puede resultar en la remoción del sitio de trabajo.\n\n¿Preguntas? Contacte la Oficina de Seguridad al ext. 4402.",
    questions: [
      {
        question: "Who sent this memo?",
        questionEs: "¿Quién envió este memorándum?",
        options: ["The project manager", "The CEO", "Robert Martinez, Safety Director", "HR Department"],
        correct: 2,
      },
      {
        question: "When do the new PPE requirements take effect?",
        questionEs: "¿Cuándo entran en vigor los nuevos requisitos de EPP?",
        options: ["Next Monday", "June 30th", "Immediately", "After training is complete"],
        correct: 2,
      },
      {
        question: "What is the deadline for completing the safety training?",
        questionEs: "¿Cuál es la fecha límite para completar la capacitación de seguridad?",
        options: ["June 17th", "June 20th", "June 30th", "July 1st"],
        correct: 2,
      },
    ],
  },
  {
    id: "email-002",
    industry: "healthcare",
    type: "email",
    title: "Patient Referral Request",
    titleEs: "Solicitud de Referido de Paciente",
    content:
      "Subject: Referral Request – Maria Gonzalez – Cardiology Consultation\n\nDear Dr. Thompson,\n\nI am writing to request a cardiology consultation for my patient, Maria Gonzalez (DOB: 04/12/1968, MRN: 847291).\n\nMs. Gonzalez presented to our clinic last Tuesday with complaints of intermittent chest discomfort and shortness of breath during moderate physical activity. Her EKG showed mild ST-segment changes that warrant further evaluation.\n\nCurrent medications:\n- Lisinopril 10mg daily\n- Metformin 500mg twice daily\n- Aspirin 81mg daily\n\nI would appreciate your evaluation at your earliest convenience. Please find the attached lab results and EKG report for your review.\n\nThank you for your prompt attention to this referral.\n\nWarm regards,\nDr. Patricia Wells\nFamily Medicine, Riverside Clinic",
    contentEs:
      "Asunto: Solicitud de Referido – Maria Gonzalez – Consulta de Cardiología\n\nEstimado Dr. Thompson,\n\nEstoy escribiendo para solicitar una consulta de cardiología para mi paciente, Maria Gonzalez (FN: 04/12/1968, MRN: 847291).\n\nLa Sra. Gonzalez se presentó a nuestra clínica el martes pasado con quejas de malestar torácico intermitente y falta de aliento durante actividad física moderada. Su EKG mostró cambios leves en el segmento ST que justifican una evaluación adicional.\n\nMedicamentos actuales:\n- Lisinopril 10mg diario\n- Metformina 500mg dos veces al día\n- Aspirina 81mg diario\n\nAgradecería su evaluación a la brevedad posible. Adjunto los resultados de laboratorio y el informe de EKG para su revisión.\n\nGracias por su pronta atención a este referido.\n\nCordialmente,\nDra. Patricia Wells\nMedicina Familiar, Clínica Riverside",
    questions: [
      {
        question: "Why is the patient being referred to cardiology?",
        questionEs: "¿Por qué se refiere a la paciente a cardiología?",
        options: ["Routine annual checkup", "Chest discomfort and shortness of breath with EKG changes", "Medication adjustment needed", "Insurance requirement"],
        correct: 1,
      },
      {
        question: "What is the patient's date of birth?",
        questionEs: "¿Cuál es la fecha de nacimiento de la paciente?",
        options: ["06/17/1980", "04/12/1968", "12/04/1972", "08/22/1975"],
        correct: 1,
      },
    ],
  },
  {
    id: "restaurant-001",
    industry: "restaurant",
    type: "notice",
    title: "Server Policy Update",
    titleEs: "Actualización de Política para Meseros",
    content:
      "STAFF NOTICE — Effective Immediately\n\nFROM: General Manager\nTO: All Front-of-House Staff\nRE: Updated Tipping and Gratuity Policy\n\nEffective this Friday, all tables of 6 or more guests will automatically receive an 18% service charge added to their bill. This charge goes directly to the server and support staff.\n\nFor tables under 6 guests, tipping remains at the customer's discretion. Servers should NOT mention the gratuity policy unless a guest asks directly.\n\nAdditionally, starting next month, all tips will be distributed at the end of each shift rather than weekly. Please confirm receipt of this notice by signing the sheet at the host stand.\n\nQuestions? See your shift supervisor.",
    contentEs:
      "AVISO AL PERSONAL — Efectivo de Inmediato\n\nDE: Gerente General\nPARA: Todo el Personal de Frente de Casa\nRE: Política de Propinas Actualizada\n\nA partir de este viernes, todas las mesas de 6 o más personas recibirán automáticamente un cargo por servicio del 18% añadido a su cuenta. Este cargo va directamente al mesero y al personal de apoyo.\n\nPara mesas de menos de 6 personas, la propina queda a discreción del cliente. Los meseros NO deben mencionar la política de propinas a menos que un cliente lo pregunte directamente.\n\nAdicional, a partir del próximo mes, todas las propinas se distribuirán al final de cada turno en lugar de semanalmente. Por favor confirme la recepción de este aviso firmando la hoja en el mostrador del anfitrión.\n\n¿Preguntas? Consulte a su supervisor de turno.",
    questions: [
      { question: "What triggers the automatic 18% service charge?", questionEs: "¿Qué activa el cargo de servicio automático del 18%?", options: ["Every table", "Tables of 6 or more guests", "Tables over $100", "Weekend tables only"], correct: 1 },
      { question: "When will tips be distributed under the new policy?", questionEs: "¿Cuándo se distribuirán las propinas bajo la nueva política?", options: ["Weekly on Fridays", "Monthly", "At the end of each shift", "Bi-weekly"], correct: 2 },
      { question: "What should servers do when they receive this notice?", questionEs: "¿Qué deben hacer los meseros al recibir este aviso?", options: ["Email the manager", "Sign the sheet at the host stand", "Post it in the break room", "Nothing required"], correct: 1 },
    ],
  },
  {
    id: "technology-001",
    industry: "technology",
    type: "email",
    title: "System Outage Notification",
    titleEs: "Notificación de Interrupción del Sistema",
    content:
      "Subject: URGENT — Planned System Maintenance — Saturday 2:00 AM–6:00 AM EST\n\nDear Team,\n\nThis is a reminder that our primary customer database will be taken offline for scheduled maintenance this Saturday, June 21st, from 2:00 AM to 6:00 AM Eastern Time.\n\nDuring this window:\n- The customer portal will be unavailable\n- All API calls will return a 503 Service Unavailable response\n- Internal dashboards will be read-only\n\nAction required before Friday at 5:00 PM:\n1. Complete and submit any pending customer data exports\n2. Notify your clients if they run automated jobs during that window\n3. Test your failover procedures\n\nThe infrastructure team will be on standby throughout the maintenance window. If you encounter issues after 6:00 AM, please page the on-call engineer via PagerDuty.\n\nThank you for your cooperation.\n\nDevOps Team",
    contentEs:
      "Asunto: URGENTE — Mantenimiento del Sistema Planificado — Sábado 2:00 AM–6:00 AM EST\n\nEstimado Equipo,\n\nEste es un recordatorio de que nuestra base de datos principal de clientes será desconectada para mantenimiento programado este sábado 21 de junio, de 2:00 AM a 6:00 AM Hora del Este.\n\nDurante esta ventana:\n- El portal de clientes no estará disponible\n- Todas las llamadas API devolverán una respuesta 503 Servicio No Disponible\n- Los dashboards internos serán de solo lectura\n\nAcción requerida antes del viernes a las 5:00 PM:\n1. Completar y enviar cualquier exportación de datos de clientes pendiente\n2. Notificar a sus clientes si ejecutan trabajos automáticos durante esa ventana\n3. Probar sus procedimientos de failover\n\nEl equipo de infraestructura estará en espera durante toda la ventana de mantenimiento. Si encuentra problemas después de las 6:00 AM, comuníquese con el ingeniero de turno vía PagerDuty.\n\nGracias por su cooperación.\n\nEquipo de DevOps",
    questions: [
      { question: "What will happen to API calls during the maintenance window?", questionEs: "¿Qué pasará con las llamadas API durante la ventana de mantenimiento?", options: ["They will work normally", "They will return a 503 error", "They will be delayed by 30 minutes", "They will be rerouted automatically"], correct: 1 },
      { question: "What must be done before Friday at 5:00 PM?", questionEs: "¿Qué debe hacerse antes del viernes a las 5:00 PM?", options: ["Restart all servers", "Complete pending data exports and notify clients", "Submit a maintenance request form", "Back up all local files"], correct: 1 },
      { question: "Who should you contact if issues persist after 6:00 AM?", questionEs: "¿A quién debe contactar si los problemas persisten después de las 6:00 AM?", options: ["Your direct manager", "The CEO", "The on-call engineer via PagerDuty", "The help desk via email"], correct: 2 },
    ],
  },
  {
    id: "logistics-001",
    industry: "logistics",
    type: "procedure",
    title: "Receiving Dock Procedures",
    titleEs: "Procedimientos del Muelle de Recepción",
    content:
      "STANDARD OPERATING PROCEDURE — Receiving Dock\nDocument: SOP-REC-004 | Revision: 3\n\nPURPOSE\nThis procedure outlines the steps required to receive, verify, and log all incoming shipments.\n\nPROCEDURE\n\nStep 1 — Verify Driver Identity\nRequest the driver's ID and carrier documentation before opening the dock door. Do not allow entry without verification.\n\nStep 2 — Match Documents to PO\nCompare the delivery manifest against the open Purchase Order in the system. Any item not on the PO must be refused.\n\nStep 3 — Physical Count\nCount all units before signing the BOL (Bill of Lading). If there is a shortage or overage, note it on the BOL before the driver leaves.\n\nStep 4 — Inspect for Damage\nInspect all pallets and cartons for visible damage. Photograph any damaged items.\n\nStep 5 — Log in System\nEnter the confirmed receipt into the WMS (Warehouse Management System) within 30 minutes of delivery.\n\nStep 6 — Notify Purchasing\nEmail purchasing@company.com with the PO number, received quantity, and any discrepancies.",
    contentEs:
      "PROCEDIMIENTO OPERATIVO ESTÁNDAR — Muelle de Recepción\nDocumento: SOP-REC-004 | Revisión: 3\n\nPROPÓSITO\nEste procedimiento describe los pasos necesarios para recibir, verificar y registrar todos los envíos entrantes.\n\nPROCEDIMIENTO\n\nPaso 1 — Verificar Identidad del Conductor\nSolicite el ID del conductor y la documentación del transportista antes de abrir la puerta del muelle. No permita la entrada sin verificación.\n\nPaso 2 — Comparar Documentos con la OC\nCompare el manifiesto de entrega con la Orden de Compra abierta en el sistema. Cualquier artículo que no esté en la OC debe ser rechazado.\n\nPaso 3 — Conteo Físico\nCuente todas las unidades antes de firmar el BOL (Conocimiento de Embarque). Si hay una faltante o exceso, anótelo en el BOL antes de que el conductor se vaya.\n\nPaso 4 — Inspeccionar Daños\nInspeccione todos los pallets y cajas por daños visibles. Fotografíe cualquier artículo dañado.\n\nPaso 5 — Registrar en el Sistema\nIngrese la recepción confirmada en el WMS (Sistema de Gestión de Almacén) dentro de los 30 minutos posteriores a la entrega.\n\nPaso 6 — Notificar a Compras\nEnvíe un correo a purchasing@company.com con el número de OC, cantidad recibida y cualquier discrepancia.",
    questions: [
      { question: "What must you do before opening the dock door?", questionEs: "¿Qué debe hacer antes de abrir la puerta del muelle?", options: ["Start unloading immediately", "Verify the driver's ID and carrier documentation", "Call the purchasing department", "Check the WMS system first"], correct: 1 },
      { question: "When should the receipt be entered into the WMS?", questionEs: "¿Cuándo debe ingresarse la recepción en el WMS?", options: ["At the end of the shift", "Within 30 minutes of delivery", "The next business day", "After the driver leaves"], correct: 1 },
      { question: "What should you do if an item is not on the Purchase Order?", questionEs: "¿Qué debe hacer si un artículo no está en la Orden de Compra?", options: ["Accept it and log it separately", "Refuse it", "Ask the driver what to do", "Store it and notify the manager later"], correct: 1 },
    ],
  },
  {
    id: "retail-001",
    industry: "retail",
    type: "memo",
    title: "Holiday Sales Floor Memo",
    titleEs: "Memo del Piso de Ventas para Temporada de Fiestas",
    content:
      "MEMORANDUM\n\nTO: All Store Associates\nFROM: District Manager, Southwest Region\nDATE: June 17, 2026\nRE: Holiday Season Preparation — Starting July 1\n\nWe are 14 days away from our earliest holiday floor set in company history. Please review the following requirements:\n\nFLOOR RESET TIMELINE\n- July 1: Remove all current seasonal displays\n- July 3–4: Receive and stage new holiday inventory in stockroom\n- July 5: Full holiday floor set complete — store ready for walk-through\n\nSTAFFING\nAll associates must be available July 3–5. No vacation requests will be approved for those dates. If you have a pre-approved exception, confirm with your store manager.\n\nCUSTOMER SERVICE STANDARD\nDuring the holiday season, our target is a 90-second greeting time for all entering customers. Every associate on the floor is responsible for this metric.\n\nQuestions? Contact your Store Manager or District Manager.",
    contentEs:
      "MEMORÁNDUM\n\nPARA: Todos los Asociados de Tienda\nDE: Gerente de Distrito, Región Suroeste\nFECHA: 17 de junio de 2026\nRE: Preparación para Temporada de Fiestas — A partir del 1 de julio\n\nEstamos a 14 días de nuestra primera configuración de piso de temporada más temprana en la historia de la empresa. Por favor revise los siguientes requisitos:\n\nLINEA DE TIEMPO DE RECONFIGURACIÓN\n- 1 de julio: Remover todos los exhibidores estacionales actuales\n- 3–4 de julio: Recibir y preparar el nuevo inventario de fiestas en la bodega\n- 5 de julio: Configuración completa del piso de fiestas — tienda lista para revisión\n\nPERSONAL\nTodos los asociados deben estar disponibles del 3 al 5 de julio. No se aprobarán solicitudes de vacaciones para esas fechas. Si tiene una excepción pre-aprobada, confirme con su gerente de tienda.\n\nESTÁNDAR DE SERVICIO AL CLIENTE\nDurante la temporada de fiestas, nuestro objetivo es un tiempo de saludo de 90 segundos para todos los clientes que entren. Cada asociado en el piso es responsable de esta métrica.\n\n¿Preguntas? Contacte a su Gerente de Tienda o Gerente de Distrito.",
    questions: [
      { question: "When must the holiday floor set be complete?", questionEs: "¿Cuándo debe completarse la configuración del piso de fiestas?", options: ["July 1", "July 3", "July 5", "July 7"], correct: 2 },
      { question: "What is the customer greeting time target during the holiday season?", questionEs: "¿Cuál es el objetivo de tiempo de saludo durante la temporada de fiestas?", options: ["30 seconds", "60 seconds", "90 seconds", "2 minutes"], correct: 2 },
      { question: "Can associates request vacation for July 3–5?", questionEs: "¿Pueden los asociados solicitar vacaciones del 3 al 5 de julio?", options: ["Yes, anytime", "Only with 2 weeks notice", "No, unless pre-approved", "Yes, with manager approval"], correct: 2 },
    ],
  },
  {
    id: "education-001",
    industry: "education",
    type: "procedure",
    title: "Emergency Evacuation Plan",
    titleEs: "Plan de Evacuación de Emergencia",
    content:
      "CAMPUS EMERGENCY PROCEDURES — Staff Reference Guide\n\nFIRE / EVACUATION PROTOCOL\n\nWhen the fire alarm sounds:\n1. Stop all instruction immediately\n2. Direct students to leave belongings and proceed to the nearest exit in single file\n3. Close — do NOT lock — the classroom door behind you\n4. Lead students to your designated assembly area (posted on your classroom wall)\n5. Take your class roster and mark attendance once outside\n6. Do not re-enter the building until the all-clear signal is given by administration\n\nACCOUNTABILITY\nOnce at your assembly area, take attendance immediately. Report any missing students to the nearest administrator. Do not assume students are with another teacher.\n\nDRILL SCHEDULE\nThe school conducts two unannounced fire drills per semester. Participation is mandatory for all staff and students.\n\nFor questions, contact the School Safety Coordinator at ext. 1100.",
    contentEs:
      "PROCEDIMIENTOS DE EMERGENCIA DEL CAMPUS — Guía de Referencia para Personal\n\nPROTOCOLO DE INCENDIO / EVACUACIÓN\n\nCuando suene la alarma de incendio:\n1. Detenga toda instrucción de inmediato\n2. Indique a los estudiantes que dejen sus pertenencias y procedan a la salida más cercana en fila de uno\n3. Cierre — NO con llave — la puerta del salón detrás de usted\n4. Lleve a los estudiantes a su área de reunión designada (publicada en la pared del salón)\n5. Lleve su lista de clase y tome asistencia una vez afuera\n6. No entre de nuevo al edificio hasta que la administración dé la señal de todo despejado\n\nRESPONSABILIDAD\nUna vez en su área de reunión, tome asistencia de inmediato. Reporte cualquier estudiante faltante al administrador más cercano. No asuma que los estudiantes están con otro maestro.\n\nCALENDARIO DE SIMULACROS\nLa escuela realiza dos simulacros de incendio no anunciados por semestre. La participación es obligatoria para todo el personal y estudiantes.\n\nPara preguntas, contacte al Coordinador de Seguridad Escolar al ext. 1100.",
    questions: [
      { question: "What should you do with the classroom door during evacuation?", questionEs: "¿Qué debe hacer con la puerta del salón durante la evacuación?", options: ["Lock it", "Leave it open", "Close but do not lock it", "Let students decide"], correct: 2 },
      { question: "What must teachers bring when evacuating?", questionEs: "¿Qué deben llevar los maestros al evacuar?", options: ["Their personal belongings", "The class roster", "The emergency kit", "Their laptop"], correct: 1 },
      { question: "When can staff re-enter the building?", questionEs: "¿Cuándo puede el personal volver a entrar al edificio?", options: ["As soon as the alarm stops", "After 10 minutes", "When the all-clear is given by administration", "When the fire department arrives"], correct: 2 },
    ],
  },
  {
    id: "hospitality-001",
    industry: "hospitality",
    type: "notice",
    title: "Guest Feedback Response Policy",
    titleEs: "Política de Respuesta a Comentarios de Huéspedes",
    content:
      "INTERNAL POLICY NOTICE\n\nTO: All Guest Services Staff\nFROM: Director of Guest Experience\nRE: Responding to Online Reviews — Updated Policy\n\nOur guest satisfaction score directly impacts hotel ranking on booking platforms. Effective immediately, all staff members who interface with guests are required to follow the updated response protocol:\n\nFOR NEGATIVE REVIEWS (1–3 stars):\n- The response must be posted within 24 hours of the review appearing\n- Always acknowledge the guest's experience without being defensive\n- Offer a specific remedy (refund, future stay discount, direct contact)\n- Never argue with the reviewer, even if the complaint is inaccurate\n\nFOR POSITIVE REVIEWS (4–5 stars):\n- Respond within 48 hours\n- Thank the guest by name if available\n- Mention a specific detail from their review to show it was read\n\nAll responses must be approved by the Guest Services Manager before being posted. Draft your responses in the shared Google Doc titled 'Review Responses — Pending.'\n\nNon-compliance with this policy will be addressed during your performance review.",
    contentEs:
      "AVISO DE POLÍTICA INTERNA\n\nPARA: Todo el Personal de Servicios al Huésped\nDE: Director de Experiencia del Huésped\nRE: Responder a Reseñas en Línea — Política Actualizada\n\nNuestra puntuación de satisfacción del huésped impacta directamente el ranking del hotel en las plataformas de reserva. Efectivo de inmediato, todos los miembros del personal que interactúan con los huéspedes deben seguir el protocolo de respuesta actualizado:\n\nPARA RESEÑAS NEGATIVAS (1–3 estrellas):\n- La respuesta debe publicarse dentro de las 24 horas de que aparezca la reseña\n- Siempre reconozca la experiencia del huésped sin ser defensivo\n- Ofrezca un remedio específico (reembolso, descuento en estadía futura, contacto directo)\n- Nunca discuta con el reseñador, aunque la queja sea inexacta\n\nPARA RESEÑAS POSITIVAS (4–5 estrellas):\n- Responda dentro de las 48 horas\n- Agradezca al huésped por nombre si está disponible\n- Mencione un detalle específico de su reseña para mostrar que fue leída\n\nTodas las respuestas deben ser aprobadas por el Gerente de Servicios al Huésped antes de publicarse. Redacte sus respuestas en el Google Doc compartido titulado 'Respuestas a Reseñas — Pendientes'.\n\nEl incumplimiento de esta política será abordado durante su evaluación de desempeño.",
    questions: [
      { question: "Within how many hours must a negative review be responded to?", questionEs: "¿En cuántas horas debe responderse a una reseña negativa?", options: ["12 hours", "24 hours", "48 hours", "72 hours"], correct: 1 },
      { question: "What should you do if a guest complaint is inaccurate?", questionEs: "¿Qué debe hacer si la queja de un huésped es inexacta?", options: ["Correct them publicly", "Ignore the review", "Still respond without arguing", "Ask them to remove the review"], correct: 2 },
      { question: "Where should draft responses be written before posting?", questionEs: "¿Dónde deben redactarse las respuestas antes de publicarlas?", options: ["Directly on the review platform", "In a personal email draft", "In the shared Google Doc", "In the hotel management system"], correct: 2 },
    ],
  },
  {
    id: "manufacturing-001",
    industry: "manufacturing",
    type: "procedure",
    title: "Machine Startup Checklist",
    titleEs: "Lista de Verificación de Arranque de Máquina",
    content:
      "STANDARD OPERATING PROCEDURE — Machine Startup\nDocument: SOP-MFG-011 | Line: Assembly B\n\nPRE-STARTUP CHECKLIST (Complete before every shift start)\n\n□ 1. Confirm lockout/tagout has been removed by authorized maintenance personnel\n□ 2. Inspect all guards and safety covers — ensure they are in place and secure\n□ 3. Clear the work area of all tools, debris, and unauthorized personnel\n□ 4. Check lubrication levels on all designated points — add if below minimum\n□ 5. Verify emergency stop button is functional — press and release to test\n□ 6. Review the production work order for today's part number and specifications\n□ 7. Run 3 sample units at reduced speed before full production\n□ 8. Inspect sample units against the quality standard — if any fail, stop and notify QC\n\nSIGNATURE REQUIRED\nThe operator and shift supervisor must both sign the checklist before production begins. Unsigned checklists are a compliance violation.\n\nCompleted checklists must be filed in the Binder at Station B12 at end of shift.",
    contentEs:
      "PROCEDIMIENTO OPERATIVO ESTÁNDAR — Arranque de Máquina\nDocumento: SOP-MFG-011 | Línea: Ensamble B\n\nLISTA DE VERIFICACIÓN PRE-ARRANQUE (Completar antes de cada inicio de turno)\n\n□ 1. Confirmar que el bloqueo/etiquetado ha sido removido por personal de mantenimiento autorizado\n□ 2. Inspeccionar todas las guardas y cubiertas de seguridad — asegurarse de que estén en su lugar y seguras\n□ 3. Despejar el área de trabajo de todas las herramientas, escombros y personal no autorizado\n□ 4. Verificar los niveles de lubricación en todos los puntos designados — agregar si está por debajo del mínimo\n□ 5. Verificar que el botón de paro de emergencia funcione — presionar y soltar para probar\n□ 6. Revisar la orden de producción del día para el número de pieza y especificaciones de hoy\n□ 7. Ejecutar 3 unidades de muestra a velocidad reducida antes de la producción completa\n□ 8. Inspeccionar unidades de muestra contra el estándar de calidad — si alguna falla, detenerse y notificar a QC\n\nSE REQUIERE FIRMA\nEl operador y el supervisor de turno deben firmar la lista de verificación antes de que comience la producción. Las listas sin firmar son una violación de cumplimiento.\n\nLas listas completadas deben archivarse en la Carpeta en la Estación B12 al final del turno.",
    questions: [
      { question: "What must happen to the lockout/tagout before startup?", questionEs: "¿Qué debe suceder con el bloqueo/etiquetado antes del arranque?", options: ["The operator removes it themselves", "It must be removed by authorized maintenance personnel", "It stays on during startup", "It is optional if the machine looks safe"], correct: 1 },
      { question: "How many sample units must be run before full production?", questionEs: "¿Cuántas unidades de muestra deben ejecutarse antes de la producción completa?", options: ["1 unit", "2 units", "3 units", "5 units"], correct: 2 },
      { question: "What happens if the startup checklist is not signed?", questionEs: "¿Qué sucede si la lista de verificación de arranque no está firmada?", options: ["Production can still start", "It is a compliance violation", "Only the supervisor needs to sign", "It gets a warning the first time"], correct: 1 },
    ],
  },
  {
    id: "healthcare-adv-001",
    industry: "healthcare",
    type: "report",
    title: "Incident Report — Medication Error",
    titleEs: "Reporte de Incidente — Error de Medicación",
    content: "CONFIDENTIAL INCIDENT REPORT\nReport ID: IR-2026-0892\nFacility: Riverside Medical Center\nDate of Incident: June 15, 2026 | Time: 14:32\nReported by: M. Torres, RN | Unit: Med-Surg 4B\n\nINCIDENT DESCRIPTION\nAt approximately 14:32, the reporting nurse administered Metoprolol 100mg to Patient J. Reyes (MRN 482910) instead of the prescribed Metoprolol 25mg. The error was detected during the 15:00 vital signs check when the patient's heart rate dropped to 48 bpm.\n\nIMMEDIATE ACTIONS TAKEN\n- Attending physician Dr. Chen was notified at 15:05\n- Patient was placed on continuous cardiac monitoring\n- No adverse outcome was observed; patient remained stable\n- Patient and family were informed per disclosure policy\n\nROOT CAUSE ANALYSIS\nThe unit stock contained both 25mg and 100mg tablets in visually similar packaging. The 25mg supply had been relocated to a new bin without updating the bin label.\n\nRECOMMENDED CORRECTIVE ACTIONS\n1. Separate high-alert medication storage by dosage with distinct color-coded labels\n2. Mandatory two-nurse verification for all cardiac medications\n3. Pharmacy review of unit stock labeling within 48 hours",
    contentEs: "REPORTE DE INCIDENTE CONFIDENCIAL\nID de Reporte: IR-2026-0892\nInstalación: Centro Médico Riverside\nFecha del Incidente: 15 de junio de 2026 | Hora: 14:32\nReportado por: M. Torres, RN | Unidad: Med-Surg 4B\n\nDESCRIPCIÓN DEL INCIDENTE\nAproximadamente a las 14:32, la enfermera que reporta administró Metoprolol 100mg al Paciente J. Reyes (MRN 482910) en lugar del Metoprolol 25mg recetado. El error fue detectado durante el chequeo de signos vitales de las 15:00 cuando la frecuencia cardíaca del paciente bajó a 48 lpm.\n\nACCIONES INMEDIATAS TOMADAS\n- El médico titular Dr. Chen fue notificado a las 15:05\n- El paciente fue colocado en monitoreo cardíaco continuo\n- No se observó resultado adverso; el paciente permaneció estable\n- El paciente y la familia fueron informados según la política de divulgación\n\nANÁLISIS DE CAUSA RAÍZ\nEl stock de la unidad contenía tabletas de 25mg y 100mg en empaque visualmente similar. El suministro de 25mg había sido reubicado a un nuevo contenedor sin actualizar la etiqueta.\n\nACCIONES CORRECTIVAS RECOMENDADAS\n1. Separar el almacenamiento de medicamentos de alta alerta por dosis con etiquetas codificadas por color\n2. Verificación obligatoria de dos enfermeras para todos los medicamentos cardíacos\n3. Revisión de farmacia de las etiquetas del stock de la unidad en 48 horas",
    questions: [
      { question: "What caused the medication error according to the root cause analysis?", questionEs: "¿Qué causó el error de medicación según el análisis de causa raíz?", options: ["The nurse was not properly trained", "Similar packaging and a mislabeled bin", "The patient requested a higher dose", "The physician wrote an incorrect order"], correct: 1 },
      { question: "How was the error detected?", questionEs: "¿Cómo fue detectado el error?", options: ["The patient complained of symptoms", "During the 15:00 vital signs check", "By the pharmacy during refill", "Another nurse noticed the medication"], correct: 1 },
      { question: "What is one of the recommended corrective actions?", questionEs: "¿Cuál es una de las acciones correctivas recomendadas?", options: ["Transfer the patient to ICU", "Terminate the reporting nurse", "Mandatory two-nurse verification for cardiac medications", "Increase physician rounds to every hour"], correct: 2 },
    ],
  },
  {
    id: "construction-adv-001",
    industry: "construction",
    type: "report",
    title: "Project Status Report — Weekly",
    titleEs: "Reporte de Estado del Proyecto — Semanal",
    content: "PROJECT STATUS REPORT\nProject: Northgate Mixed-Use Development\nReport Period: Week of June 9–15, 2026\nPrepared by: R. Gutierrez, Project Manager\n\nOVERALL STATUS: YELLOW — Schedule at Risk\n\nSCHEDULE SUMMARY\nThe project is currently 6 calendar days behind the baseline schedule. The primary driver is a 4-day delay in steel delivery from the fabricator (Acme Steel, PO #7821), compounded by 2 days of rain-impacted work on the 4th-floor deck pour.\n\nCURRENT WEEK ACCOMPLISHMENTS\n- 3rd floor slab pour completed: 4,200 SF\n- MEP rough-in on floors 1–2: 85% complete\n- Curtain wall shop drawings approved by architect\n\nFORECAST TO COMPLETE\nWith a revised steel delivery on June 19th and favorable weather, the team forecasts recovering 4 days by accelerating the structural steel erection sequence. Projected completion remains June 30, 2026 if recovery plan is executed.\n\nOPEN ISSUES\n1. ISSUE-014: Electrical room dimensions conflict with structural drawings — RFI submitted, pending architect response (3 days outstanding)\n2. ISSUE-017: Elevator pit drainage not specified — clarification requested from MEP engineer\n\nBUDGET SUMMARY\nCost to date: $4.2M of $11.8M contract. No approved change orders to date. Two potential COs in review totaling $47,000.",
    contentEs: "REPORTE DE ESTADO DEL PROYECTO\nProyecto: Desarrollo de Uso Mixto Northgate\nPeríodo del Reporte: Semana del 9–15 de junio de 2026\nPreparado por: R. Gutiérrez, Gerente de Proyecto\n\nESTADO GENERAL: AMARILLO — Cronograma en Riesgo\n\nRESUMEN DEL CRONOGRAMA\nEl proyecto está actualmente 6 días calendario por detrás del cronograma base. El principal impulsor es un retraso de 4 días en la entrega de acero del fabricante (Acme Steel, OC #7821), compuesto por 2 días de trabajo afectado por lluvia en el vaciado del deck del 4to piso.\n\nLOGROS DE LA SEMANA ACTUAL\n- Vaciado de losa del 3er piso completado: 4,200 SF\n- Instalación MEP en bruto en pisos 1–2: 85% completo\n- Planos de taller de muro cortina aprobados por el arquitecto\n\nPRONÓSTICO PARA COMPLETAR\nCon una entrega revisada de acero el 19 de junio y clima favorable, el equipo pronostica recuperar 4 días acelerando la secuencia de erección de acero estructural. La finalización proyectada permanece el 30 de junio de 2026 si se ejecuta el plan de recuperación.\n\nPROBLEMAS ABIERTOS\n1. PROBLEMA-014: Las dimensiones del cuarto eléctrico entran en conflicto con los planos estructurales — RFI enviado, pendiente de respuesta del arquitecto (3 días pendiente)\n2. PROBLEMA-017: El drenaje del foso del elevador no está especificado — se solicitó aclaración al ingeniero MEP",
    questions: [
      { question: "What is the overall project status color and what does it mean?", questionEs: "¿Cuál es el color de estado general del proyecto y qué significa?", options: ["Green — on track", "Yellow — schedule at risk", "Red — project stopped", "Blue — ahead of schedule"], correct: 1 },
      { question: "What are the two causes of the schedule delay?", questionEs: "¿Cuáles son las dos causas del retraso en el cronograma?", options: ["Budget overrun and labor shortage", "Steel delivery delay and rain-impacted work", "Design change and permit delay", "Subcontractor default and material shortage"], correct: 1 },
      { question: "What must happen for the June 30 completion date to be achieved?", questionEs: "¿Qué debe suceder para lograr la fecha de finalización del 30 de junio?", options: ["Hire more workers immediately", "Revised steel delivery by June 19 and favorable weather", "Submit a contract extension request", "Eliminate the two open issues"], correct: 1 },
    ],
  },
  {
    id: "restaurant-adv-001",
    industry: "restaurant",
    type: "report",
    title: "Health Inspection Report Response",
    titleEs: "Respuesta al Reporte de Inspección de Salud",
    content: "MEMORANDUM\n\nTO: County Health Department — Environmental Health Division\nFROM: Carlos Mendez, General Manager — La Mesa Grill\nRE: Response to Inspection Report #HD-2026-4471 dated June 10, 2026\n\nThank you for your inspection and the detailed report. We take food safety with the utmost seriousness and have already taken corrective action on all cited violations.\n\nVIOLATION 1: Sanitizer concentration below required 200 ppm (observed at 80 ppm)\nCorrective Action: All sanitizer solution has been replaced. Staff completed a 45-minute retraining on proper concentration measurement and verification. A posted log has been implemented requiring documentation of sanitizer checks every 2 hours.\n\nVIOLATION 2: Walk-in cooler temperature logged at 42°F (required: below 41°F)\nCorrective Action: Refrigeration service was called within 2 hours of the inspection. The thermostat was recalibrated to 37°F. All product was verified safe during the repair window. A temperature log is now checked and initialed every 4 hours.\n\nVIOLATION 3: Employee handling ready-to-eat food without gloves\nCorrective Action: Immediate verbal and written warning was issued. All staff completed a refresher on bare-hand contact prohibition with ready-to-eat foods. Glove stations have been added at two additional prep stations.\n\nWe respectfully request a re-inspection at your earliest convenience to verify compliance.",
    contentEs: "MEMORÁNDUM\n\nPARA: Departamento de Salud del Condado — División de Salud Ambiental\nDE: Carlos Méndez, Gerente General — La Mesa Grill\nRE: Respuesta al Reporte de Inspección #HD-2026-4471 con fecha 10 de junio de 2026\n\nGracias por su inspección y el reporte detallado. Tomamos la seguridad alimentaria con la mayor seriedad y ya hemos tomado acción correctiva en todas las violaciones citadas.\n\nVIOLACIÓN 1: Concentración de sanitizante por debajo de los 200 ppm requeridos (observado a 80 ppm)\nAcción Correctiva: Toda la solución sanitizante ha sido reemplazada. El personal completó una recapacitación de 45 minutos sobre la medición y verificación correcta de la concentración. Se implementó un registro publicado que requiere documentación de las verificaciones del sanitizante cada 2 horas.\n\nVIOLACIÓN 2: Temperatura del enfriador walk-in registrada a 42°F (requerido: menos de 41°F)\nAcción Correctiva: Se llamó al servicio de refrigeración dentro de las 2 horas de la inspección. El termostato fue recalibrado a 37°F. Todo el producto fue verificado como seguro durante la ventana de reparación. Un registro de temperatura ahora se revisa e inicializa cada 4 horas.\n\nVIOLACIÓN 3: Empleado manejando alimentos listos para consumir sin guantes\nAcción Correctiva: Se emitió una advertencia verbal y escrita inmediata. Todo el personal completó un repaso sobre la prohibición de contacto con manos desnudas con alimentos listos para consumir. Se han agregado estaciones de guantes en dos estaciones de preparación adicionales.",
    questions: [
      { question: "What was wrong with the sanitizer solution during inspection?", questionEs: "¿Qué estaba mal con la solución sanitizante durante la inspección?", options: ["It was the wrong type", "It was expired", "Concentration was 80 ppm, below the 200 ppm requirement", "The containers were not labeled"], correct: 2 },
      { question: "What temperature was the walk-in cooler and what is the requirement?", questionEs: "¿A qué temperatura estaba el enfriador walk-in y cuál es el requisito?", options: ["38°F observed, must be below 35°F", "42°F observed, must be below 41°F", "45°F observed, must be below 40°F", "40°F observed, must be below 38°F"], correct: 1 },
      { question: "What new system was implemented after the sanitizer violation?", questionEs: "¿Qué nuevo sistema se implementó después de la violación de sanitizante?", options: ["Weekly health audits", "A posted log documenting sanitizer checks every 2 hours", "Monthly third-party inspections", "Daily deep cleaning schedule"], correct: 1 },
    ],
  },
  {
    id: "office-adv-001",
    industry: "office",
    type: "report",
    title: "Q2 Business Review Presentation Summary",
    titleEs: "Resumen de Presentación de Revisión de Negocio Q2",
    content: "QUARTERLY BUSINESS REVIEW — Q2 2026\nPrepared for: Executive Leadership Team\nPrepared by: Operations Division\n\nEXECUTIVE SUMMARY\nQ2 revenue came in at $4.7M, representing 103% of plan — a $138K favorable variance. Operating margin improved to 18.4% from 15.9% in Q1, driven primarily by headcount optimization and a reduction in travel and expense spend.\n\nKEY WINS\n- Closed the Henderson account: $920K ARR, largest single deal in company history\n- Reduced average sales cycle from 67 days to 52 days through CRM process improvement\n- Customer NPS improved from 42 to 61 following the onboarding redesign launched in April\n\nCHALLENGES AND RISKS\n- Enterprise pipeline is 22% below the Q3 target. The primary risk is insufficient qualified leads in the $500K+ segment.\n- Two key account managers resigned in June, representing $1.8M in managed ARR. Backfilling is in progress.\n\nQ3 PRIORITIES\n1. Accelerate enterprise pipeline through targeted outbound and partner channel expansion\n2. Onboard two replacement AMs by July 31 to minimize revenue risk\n3. Launch product feature update requested by top 3 accounts\n\nNEXT STEPS\nLeadership to review and approve Q3 resource allocation by June 25.",
    contentEs: "REVISIÓN DE NEGOCIO TRIMESTRAL — Q2 2026\nPreparado para: Equipo de Liderazgo Ejecutivo\nPreparado por: División de Operaciones\n\nRESUMEN EJECUTIVO\nLos ingresos del Q2 llegaron a $4.7M, representando el 103% del plan — una variación favorable de $138K. El margen operativo mejoró al 18.4% desde el 15.9% en Q1, impulsado principalmente por la optimización de personal y una reducción en gastos de viaje.\n\nLOGROS CLAVE\n- Cierre de la cuenta Henderson: $920K ARR, el trato individual más grande en la historia de la empresa\n- Reducción del ciclo de ventas promedio de 67 días a 52 días mediante la mejora del proceso de CRM\n- NPS del cliente mejoró de 42 a 61 tras el rediseño de incorporación lanzado en abril\n\nDESAFÍOS Y RIESGOS\n- El pipeline empresarial está un 22% por debajo del objetivo del Q3. El principal riesgo es la insuficiencia de leads calificados en el segmento de $500K+.\n- Dos gerentes de cuentas clave renunciaron en junio, representando $1.8M en ARR gestionado. El reemplazo está en progreso.",
    questions: [
      { question: "What was Q2 revenue as a percentage of plan?", questionEs: "¿Cuál fue el ingreso del Q2 como porcentaje del plan?", options: ["97% of plan", "100% exactly", "103% of plan", "88% of plan"], correct: 2 },
      { question: "What is the primary risk heading into Q3?", questionEs: "¿Cuál es el principal riesgo de cara al Q3?", options: ["Product delays", "Insufficient qualified leads in the enterprise segment", "Customer churn above forecast", "Operating costs out of control"], correct: 1 },
      { question: "What must leadership do by June 25?", questionEs: "¿Qué debe hacer el liderazgo antes del 25 de junio?", options: ["Present to the board", "Review and approve Q3 resource allocation", "Sign the Henderson contract", "Finalize Q2 financial statements"], correct: 1 },
    ],
  },
  {
    id: "retail-adv-001",
    industry: "retail",
    type: "report",
    title: "Weekly Sales Performance Report",
    titleEs: "Reporte de Desempeño de Ventas Semanal",
    content: "WEEKLY PERFORMANCE SUMMARY\nStore #0417 — Westfield Mall Location\nWeek Ending: June 15, 2026\nPrepared by: Store Manager, J. Okafor\n\nSALES PERFORMANCE\nTotal Net Sales: $84,320 vs. $79,100 plan (+6.6%)\nComparable Store Sales: +3.2% vs. same week last year\nTransactions: 1,847 vs. 1,612 last year (+14.6%)\nAverage Transaction Value: $45.65 vs. $49.07 last year (-7.0%)\n\nANALYSIS\nThe increase in transactions was driven by the Father's Day promotional event, which brought strong foot traffic. However, the decline in average transaction value indicates customers are purchasing promotional items at discounted prices without adding full-price items. This pattern suggests an opportunity to improve attach rate through suggestive selling.\n\nSHRINK AND COMPLIANCE\nThis week's cycle count identified a $420 shrink variance on wireless accessories. Loss prevention has been notified. A full accessory wall audit is scheduled for Monday.\n\nSTAFFING\nTotal scheduled hours: 312 | Actual hours: 298 (4.5% under)\nOne call-out was not covered, resulting in a 2-hour floor coverage gap on Saturday afternoon — peak traffic window. This is flagged for scheduling review.\n\nNEXT WEEK PRIORITIES\n1. Focus on attach rate coaching — target $50+ ATV\n2. Complete wireless accessories audit Monday AM\n3. Review Saturday scheduling to eliminate coverage gaps",
    contentEs: "RESUMEN DE DESEMPEÑO SEMANAL\nTienda #0417 — Ubicación Westfield Mall\nSemana que Termina: 15 de junio de 2026\nPreparado por: Gerente de Tienda, J. Okafor\n\nDESEMPEÑO DE VENTAS\nVentas Netas Totales: $84,320 vs. $79,100 plan (+6.6%)\nVentas de Tienda Comparable: +3.2% vs. misma semana del año pasado\nTransacciones: 1,847 vs. 1,612 del año pasado (+14.6%)\nValor Promedio de Transacción: $45.65 vs. $49.07 del año pasado (-7.0%)\n\nANÁLISIS\nEl aumento en transacciones fue impulsado por el evento promocional del Día del Padre, que trajo un fuerte tráfico peatonal. Sin embargo, la disminución en el valor promedio de transacción indica que los clientes están comprando artículos promocionales a precios con descuento sin agregar artículos a precio completo. Este patrón sugiere una oportunidad para mejorar la tasa de adjunción mediante ventas sugeridas.\n\nMERMA Y CUMPLIMIENTO\nEl conteo cíclico de esta semana identificó una variación de merma de $420 en accesorios inalámbricos. Se notificó a prevención de pérdidas. Una auditoría completa del muro de accesorios está programada para el lunes.",
    questions: [
      { question: "Why did transactions increase while average transaction value decreased?", questionEs: "¿Por qué aumentaron las transacciones mientras el valor promedio de transacción disminuyó?", options: ["Staff gave too many discounts", "Father's Day promo drove traffic but customers bought discounted items without full-price adds", "The store ran out of full-price merchandise", "Incorrect pricing on the system"], correct: 1 },
      { question: "What compliance issue was identified this week?", questionEs: "¿Qué problema de cumplimiento fue identificado esta semana?", options: ["A cashier error on returns", "$420 shrink variance on wireless accessories", "A vendor overshipment", "Expired product on shelves"], correct: 1 },
      { question: "What was the staffing issue on Saturday?", questionEs: "¿Cuál fue el problema de personal el sábado?", options: ["Too many employees scheduled", "A call-out created a 2-hour floor coverage gap during peak traffic", "Overtime was exceeded", "A manager left early"], correct: 1 },
    ],
  },
  {
    id: "technology-adv-001",
    industry: "technology",
    type: "memo",
    title: "Security Vulnerability Disclosure Memo",
    titleEs: "Memo de Divulgación de Vulnerabilidad de Seguridad",
    content: "CONFIDENTIAL — INTERNAL USE ONLY\n\nTO: Engineering, Product, and Legal Teams\nFROM: Dmitri Volkov, Chief Information Security Officer\nRE: Critical Vulnerability Disclosure — CVE-2026-8841\n\nOn June 12, 2026, our security team identified a critical SQL injection vulnerability (CVSS Score: 9.1) in the user authentication module of the customer portal. This vulnerability could allow an unauthenticated attacker to extract customer data from the database.\n\nCURRENT STATUS\nThe vulnerability has been patched in the development environment. Production deployment is scheduled for Saturday, June 22 at 2:00 AM during the planned maintenance window.\n\nIMPACT ASSESSMENT\nBased on our forensic review, there is no evidence that this vulnerability has been exploited. No customer data breach has been confirmed as of this writing.\n\nACTION REQUIRED BY TEAM\n\nEngineering: Validate patch in staging by June 20. Complete penetration test against the auth module post-patch.\n\nProduct: Prepare in-app notification template in case customer disclosure is required.\n\nLegal: Review disclosure obligations under CCPA and applicable state breach notification laws. Advise CISO by June 21.\n\nThis memo is attorney-client privileged. Do not forward or discuss outside of listed recipients.\n\nDmitri Volkov, CISO",
    contentEs: "CONFIDENCIAL — SOLO USO INTERNO\n\nPARA: Equipos de Ingeniería, Producto y Legal\nDE: Dmitri Volkov, Director de Seguridad de la Información\nRE: Divulgación de Vulnerabilidad Crítica — CVE-2026-8841\n\nEl 12 de junio de 2026, nuestro equipo de seguridad identificó una vulnerabilidad crítica de inyección SQL (Puntuación CVSS: 9.1) en el módulo de autenticación de usuarios del portal de clientes. Esta vulnerabilidad podría permitir a un atacante no autenticado extraer datos de clientes de la base de datos.\n\nESTADO ACTUAL\nLa vulnerabilidad ha sido parcheada en el entorno de desarrollo. El despliegue a producción está programado para el sábado 22 de junio a las 2:00 AM durante la ventana de mantenimiento planificada.\n\nEVALUACIÓN DE IMPACTO\nBasado en nuestra revisión forense, no hay evidencia de que esta vulnerabilidad haya sido explotada. No se ha confirmado ninguna brecha de datos de clientes hasta la fecha de este escrito.\n\nACCIÓN REQUERIDA POR EQUIPO\n\nIngeniería: Validar el parche en staging antes del 20 de junio. Completar prueba de penetración contra el módulo de autenticación post-parche.\n\nProducto: Preparar plantilla de notificación en la aplicación en caso de que se requiera divulgación al cliente.\n\nLegal: Revisar las obligaciones de divulgación bajo CCPA y las leyes estatales aplicables de notificación de brechas. Asesorar al CISO antes del 21 de junio.",
    questions: [
      { question: "What type of vulnerability was discovered?", questionEs: "¿Qué tipo de vulnerabilidad fue descubierta?", options: ["Cross-site scripting (XSS)", "Distributed denial of service (DDoS)", "SQL injection with CVSS score 9.1", "Phishing campaign targeting employees"], correct: 2 },
      { question: "Has the vulnerability been exploited based on the forensic review?", questionEs: "¿Ha sido explotada la vulnerabilidad según la revisión forense?", options: ["Yes, customer data was confirmed stolen", "No evidence of exploitation confirmed", "Unknown — investigation is ongoing", "Yes, but only test accounts were affected"], correct: 1 },
      { question: "What is Legal's deadline to advise the CISO?", questionEs: "¿Cuál es la fecha límite del equipo Legal para asesorar al CISO?", options: ["June 20", "June 21", "June 22", "June 25"], correct: 1 },
    ],
  },
  {
    id: "logistics-adv-001",
    industry: "logistics",
    type: "report",
    title: "Carrier Scorecard Report",
    titleEs: "Reporte de Tarjeta de Puntuación del Transportista",
    content: "CARRIER PERFORMANCE SCORECARD — Q2 2026\nAccount: National Distribution Partners\nCarrier: Southwest Freight Solutions\nPrepared by: Logistics Analytics Team\n\nSCORECARD SUMMARY\n\nOn-Time Delivery Rate: 71.3% (SLA: 95%) — FAILING\nClaim Rate (damaged/lost): 2.8% (threshold: 1.5%) — FAILING\nTransit Time Accuracy: 84.1% (target: 92%) — AT RISK\nInvoice Accuracy: 98.7% (target: 97%) — PASSING\nResponsiveness (24-hr claim response): 61% (target: 85%) — FAILING\n\nROOT CAUSE SUMMARY — TOP 3 DELAY REASONS\n1. Driver shortage at Southwest hub (accounts for 41% of late deliveries)\n2. Weather-related delays — Gulf region (22%)\n3. Shipper-caused: loading delays at 3 customer locations (18%)\n\nFINANCIAL IMPACT\nExpedite costs attributed to carrier performance: $6,200\nCustomer penalty claims triggered: $1,800\nTotal Q2 impact: $8,000\n\nCONTRACT STATUS\nCarrier is in material breach of SLA. Per Section 8.3 of the master agreement, NDP has the right to issue a corrective action notice and reallocate up to 30% of volume to secondary carriers without penalty.\n\nRECOMMENDED NEXT STEPS\n1. Issue formal corrective action notice\n2. Request a written improvement plan within 10 business days\n3. Engage backup carrier for Gulf-region lanes immediately",
    contentEs: "TARJETA DE PUNTUACIÓN DE TRANSPORTISTA — Q2 2026\nCuenta: National Distribution Partners\nTransportista: Southwest Freight Solutions\nPreparado por: Equipo de Análisis de Logística\n\nRESUMEN DE TARJETA DE PUNTUACIÓN\n\nTasa de Entrega a Tiempo: 71.3% (SLA: 95%) — FALLANDO\nTasa de Reclamaciones (dañado/perdido): 2.8% (umbral: 1.5%) — FALLANDO\nPrecisión del Tiempo de Tránsito: 84.1% (objetivo: 92%) — EN RIESGO\nPrecisión de Factura: 98.7% (objetivo: 97%) — PASANDO\nCapacidad de Respuesta (respuesta a reclamación en 24 horas): 61% (objetivo: 85%) — FALLANDO\n\nRESUMEN DE CAUSA RAÍZ — TOP 3 RAZONES DE RETRASO\n1. Escasez de conductores en el hub del suroeste (representa el 41% de las entregas tardías)\n2. Retrasos relacionados con el clima — región del Golfo (22%)\n3. Causado por el remitente: retrasos de carga en 3 ubicaciones de clientes (18%)",
    questions: [
      { question: "How many of the five KPIs is the carrier failing or at risk on?", questionEs: "¿En cuántos de los cinco KPIs el transportista está fallando o en riesgo?", options: ["One", "Two", "Three", "Four"], correct: 3 },
      { question: "What is the single biggest cause of late deliveries?", questionEs: "¿Cuál es la causa más grande de entregas tardías?", options: ["Weather in the Gulf region", "Shipper-caused loading delays", "Driver shortage at the Southwest hub", "Mechanical failures"], correct: 2 },
      { question: "What right does NDP have under Section 8.3 of the contract?", questionEs: "¿Qué derecho tiene NDP bajo la Sección 8.3 del contrato?", options: ["Terminate the contract immediately", "Issue a corrective action notice and reallocate up to 30% of volume", "Withhold all payment until performance improves", "Reduce agreed rates by 15%"], correct: 1 },
    ],
  },
  {
    id: "education-adv-001",
    industry: "education",
    type: "report",
    title: "School Improvement Plan Executive Summary",
    titleEs: "Resumen Ejecutivo del Plan de Mejora Escolar",
    content: "SCHOOL IMPROVEMENT PLAN — EXECUTIVE SUMMARY\nMorning Star Elementary School | Academic Year 2026–2027\nPrincipal: Dr. A. Moreno | Submitted to: District Office\n\nSCHOOL PROFILE\nEnrollment: 487 students | 68% English Learners | 74% Free/Reduced Lunch\n\nCURRENT PERFORMANCE DATA\n- 3rd Grade ELA Proficiency: 41% (District target: 60%)\n- 3rd Grade Math Proficiency: 37% (District target: 60%)\n- Chronic Absenteeism Rate: 22% (State threshold: 10%)\n- Teacher Retention: 71% (District average: 84%)\n\nROOT CAUSE ANALYSIS\nData team analysis identified three contributing factors: (1) insufficient tier 2 intervention for students below grade level in early literacy, (2) high student absenteeism reducing instructional minutes, and (3) teacher turnover disrupting instructional continuity, particularly in grades K–2.\n\nIMPROVEMENT PRIORITIES FOR 2026–27\n1. LITERACY FIRST: Implement structured literacy program (Wit & Wisdom) school-wide with embedded coaching\n2. ATTENDANCE CAMPAIGN: Launch family engagement initiative targeting 15 highest-absence students per grade\n3. TEACHER RETENTION: Partner with district HR on signing bonus and mentoring program for Year 1–3 teachers\n\nTARGETS FOR 2026–27\n- 3rd Grade ELA Proficiency: 52% (11-point growth)\n- 3rd Grade Math Proficiency: 48% (11-point growth)\n- Chronic Absenteeism: Reduce to 15%\n- Teacher Retention: Improve to 80%",
    contentEs: "PLAN DE MEJORA ESCOLAR — RESUMEN EJECUTIVO\nEscuela Primaria Morning Star | Año Académico 2026–2027\nDirector: Dr. A. Moreno | Enviado a: Oficina del Distrito\n\nPERFIL ESCOLAR\nMatrícula: 487 estudiantes | 68% Aprendices de Inglés | 74% Almuerzo Gratis/Reducido\n\nDATOS DE DESEMPEÑO ACTUAL\n- Competencia en ELA de 3er Grado: 41% (Objetivo del Distrito: 60%)\n- Competencia en Matemáticas de 3er Grado: 37% (Objetivo del Distrito: 60%)\n- Tasa de Ausentismo Crónico: 22% (Umbral Estatal: 10%)\n- Retención de Maestros: 71% (Promedio del Distrito: 84%)\n\nANÁLISIS DE CAUSA RAÍZ\nEl análisis del equipo de datos identificó tres factores contribuyentes: (1) intervención de nivel 2 insuficiente para estudiantes por debajo del nivel de grado en alfabetización temprana, (2) alto ausentismo estudiantil que reduce los minutos de instrucción, y (3) rotación de maestros que interrumpe la continuidad instruccional, particularmente en los grados K–2.",
    questions: [
      { question: "What is the school's 3rd grade ELA proficiency compared to the district target?", questionEs: "¿Cuál es la competencia en ELA de 3er grado de la escuela comparada con el objetivo del distrito?", options: ["41% vs. 60% target", "60% vs. 41% target", "52% vs. 60% target", "37% vs. 60% target"], correct: 0 },
      { question: "What are the three root causes identified in the improvement plan?", questionEs: "¿Cuáles son las tres causas raíz identificadas en el plan de mejora?", options: ["Budget cuts, outdated curriculum, poor leadership", "Insufficient tier 2 intervention, high absenteeism, teacher turnover", "Low test scores, parent disengagement, inadequate facilities", "Staff shortage, technology gaps, language barriers"], correct: 1 },
      { question: "What is the teacher retention target for 2026–27?", questionEs: "¿Cuál es el objetivo de retención de maestros para 2026–27?", options: ["71%", "75%", "80%", "84%"], correct: 2 },
    ],
  },
  {
    id: "hospitality-adv-001",
    industry: "hospitality",
    type: "report",
    title: "Guest Satisfaction Analysis Report",
    titleEs: "Reporte de Análisis de Satisfacción del Huésped",
    content: "GUEST SATISFACTION QUARTERLY ANALYSIS\nProperty: Grand Palms Hotel — Downtown\nQ2 2026 | Prepared by: Guest Experience Team\n\nOVERALL SATISFACTION SCORE: 78/100 (Q1: 81/100)\n\nSCORE BREAKDOWN BY CATEGORY\n- Room Cleanliness: 89/100 ✓\n- Check-In Experience: 74/100 ⚠\n- Food & Beverage Quality: 81/100 ✓\n- Staff Friendliness: 91/100 ✓\n- Value for Price: 61/100 ✗\n- Problem Resolution: 63/100 ✗\n\nKEY FINDINGS FROM REVIEW ANALYSIS (482 reviews analyzed)\n\nTop Positive Themes:\n1. Staff consistently praised as \"warm,\" \"helpful,\" and \"professional\" (mentioned in 67% of 4–5 star reviews)\n2. Room quality and cleanliness frequently highlighted\n\nTop Negative Themes:\n1. Price-value perception: Guests feel pricing is misaligned with amenity offerings (31% of negative reviews)\n2. Problem resolution: Long wait times and lack of ownership when issues arise (28% of negative reviews)\n3. Check-in wait times exceeding 15 minutes cited in 19% of all reviews\n\nRECOMMENDATIONS\n1. Empower front-line staff with resolution authority up to $75 without manager approval\n2. Implement mobile check-in to reduce front desk congestion\n3. Review rate strategy for value-perception alignment — consider adding amenity packages",
    contentEs: "ANÁLISIS TRIMESTRAL DE SATISFACCIÓN DEL HUÉSPED\nPropiedad: Grand Palms Hotel — Centro\nQ2 2026 | Preparado por: Equipo de Experiencia del Huésped\n\nPUNTUACIÓN GENERAL DE SATISFACCIÓN: 78/100 (Q1: 81/100)\n\nDESGLOSE DE PUNTUACIÓN POR CATEGORÍA\n- Limpieza de Habitación: 89/100 ✓\n- Experiencia de Check-In: 74/100 ⚠\n- Calidad de Alimentos y Bebidas: 81/100 ✓\n- Amabilidad del Personal: 91/100 ✓\n- Valor por Precio: 61/100 ✗\n- Resolución de Problemas: 63/100 ✗\n\nHALLAZGOS CLAVE DEL ANÁLISIS DE RESEÑAS (482 reseñas analizadas)\n\nTemas Positivos Principales:\n1. Personal constantemente elogiado como 'cálido', 'servicial' y 'profesional' (mencionado en el 67% de las reseñas de 4–5 estrellas)\n2. La calidad y limpieza de las habitaciones frecuentemente destacadas",
    questions: [
      { question: "Which two categories have the lowest satisfaction scores?", questionEs: "¿Qué dos categorías tienen las puntuaciones de satisfacción más bajas?", options: ["Room Cleanliness and Staff Friendliness", "Value for Price and Problem Resolution", "Check-In Experience and Food Quality", "Staff Friendliness and Check-In Experience"], correct: 1 },
      { question: "What is the most common complaint in negative reviews?", questionEs: "¿Cuál es la queja más común en las reseñas negativas?", options: ["Poor room cleanliness", "Unfriendly staff", "Price-value perception misalignment", "Noisy environment"], correct: 2 },
      { question: "What operational change is recommended to address problem resolution scores?", questionEs: "¿Qué cambio operativo se recomienda para abordar las puntuaciones de resolución de problemas?", options: ["Hire more managers", "Train all staff in conflict resolution", "Empower front-line staff with resolution authority up to $75 without manager approval", "Add a dedicated complaints hotline"], correct: 2 },
    ],
  },
  {
    id: "manufacturing-adv-001",
    industry: "manufacturing",
    type: "report",
    title: "Production Efficiency Analysis Report",
    titleEs: "Reporte de Análisis de Eficiencia de Producción",
    content: "PRODUCTION EFFICIENCY ANALYSIS — LINE 3\nReport Period: June 1–15, 2026\nPrepared by: Industrial Engineering Team\n\nOEE SUMMARY (Overall Equipment Effectiveness)\nCurrent OEE: 61.4% | World-Class Benchmark: 85%\n\nOEE COMPONENT BREAKDOWN\n- Availability: 78.2% (target: 90%) — equipment downtime is the primary driver\n- Performance: 83.6% (target: 95%) — minor speed losses and micro-stoppages\n- Quality: 94.0% (target: 99%) — first-pass yield below target\n\nTOP 5 DOWNTIME CAUSES (Hours Lost, June 1–15)\n1. Press 7 hydraulic seal failure: 14.5 hours\n2. Conveyor belt replacement (planned): 8.0 hours\n3. Tooling changeover — extended setup time: 6.2 hours\n4. Press 3 electrical fault: 4.8 hours\n5. Material shortage — supplier delivery delay: 3.1 hours\n\nFIRST-PASS YIELD ANALYSIS\nLine 3 first-pass yield: 94.0% vs. 99% target. Primary defect type: surface finish deviation on Part #A-4421 (accounts for 68% of rejects). Root cause under investigation — suspected correlation with tooling wear cycle.\n\nRECOMMENDATIONS\n1. Implement predictive maintenance schedule for Press 7 hydraulic system (est. savings: 10+ hours/month)\n2. Reduce tooling changeover time through SMED methodology (target: reduce from 6.2 to 3.5 hours)\n3. Investigate Part #A-4421 surface finish defect — review tooling replacement interval",
    contentEs: "ANÁLISIS DE EFICIENCIA DE PRODUCCIÓN — LÍNEA 3\nPeríodo del Reporte: 1–15 de junio de 2026\nPreparado por: Equipo de Ingeniería Industrial\n\nRESUMEN OEE (Efectividad General del Equipo)\nOEE Actual: 61.4% | Benchmark de Clase Mundial: 85%\n\nDESGLOSE DE COMPONENTES OEE\n- Disponibilidad: 78.2% (objetivo: 90%) — el tiempo de inactividad del equipo es el principal impulsor\n- Desempeño: 83.6% (objetivo: 95%) — pequeñas pérdidas de velocidad y micro-paradas\n- Calidad: 94.0% (objetivo: 99%) — rendimiento de primer paso por debajo del objetivo\n\nPRINCIPALES 5 CAUSAS DE TIEMPO DE INACTIVIDAD (Horas Perdidas, 1–15 de junio)\n1. Falla del sello hidráulico de la Prensa 7: 14.5 horas\n2. Reemplazo de banda transportadora (planificado): 8.0 horas\n3. Cambio de herramientas — tiempo de preparación extendido: 6.2 horas\n4. Falla eléctrica de la Prensa 3: 4.8 horas\n5. Escasez de material — retraso en entrega del proveedor: 3.1 horas",
    questions: [
      { question: "What is the current OEE and how does it compare to world-class?", questionEs: "¿Cuál es el OEE actual y cómo se compara con el de clase mundial?", options: ["85% vs. 61.4% world-class benchmark", "61.4% current vs. 85% world-class benchmark", "94% current vs. 99% target", "78.2% current vs. 90% target"], correct: 1 },
      { question: "What is the single biggest cause of downtime on Line 3?", questionEs: "¿Cuál es la causa más grande de tiempo de inactividad en la Línea 3?", options: ["Material shortage", "Conveyor belt replacement", "Press 7 hydraulic seal failure", "Tooling changeover"], correct: 2 },
      { question: "What methodology is recommended to reduce tooling changeover time?", questionEs: "¿Qué metodología se recomienda para reducir el tiempo de cambio de herramientas?", options: ["Six Sigma DMAIC", "SMED methodology", "5S workplace organization", "Kaizen rapid improvement event"], correct: 1 },
    ],
  },
];

// ─── Vocab definitions ───────────────────────────────────────────────────────
type VocabDef = { word: string; def: string; defEs: string };
const VOCAB: VocabDef[] = [
  { word: "performance review", def: "A formal evaluation of an employee's work quality and output.", defEs: "Evaluación formal del desempeño laboral de un empleado." },
  { word: "scheduling conflict", def: "When two appointments or obligations overlap in time.", defEs: "Cuando dos compromisos se superponen en el tiempo." },
  { word: "accomplishments", def: "Things successfully achieved or completed.", defEs: "Logros o metas completadas con éxito." },
  { word: "PPE", def: "Personal Protective Equipment — safety gear required on site.", defEs: "Equipo de Protección Personal requerido en obra." },
  { word: "comply", def: "To act in accordance with rules or requirements.", defEs: "Actuar de acuerdo con reglas o requisitos." },
  { word: "referral", def: "When a doctor sends a patient to a specialist for further care.", defEs: "Cuando un médico envía a un paciente a un especialista." },
  { word: "consultation", def: "A meeting with a specialist to get expert advice or diagnosis.", defEs: "Reunión con un especialista para obtener consejo o diagnóstico." },
  { word: "warrant", def: "To justify or make necessary.", defEs: "Justificar o hacer necesario algo." },
];

// ─── Document renderer ───────────────────────────────────────────────────────
function DocumentView({ exercise, lang }: { exercise: ReadingExercise; lang: "en" | "es" }) {
  const text = lang === "en" ? exercise.content : exercise.contentEs;
  const isMemo = exercise.type === "memo";
  const lines = text.split("\n");

  return (
    <div
      className="border border-[#D8D4CC] p-6 text-sm leading-relaxed"
      style={{
        background: "#FAFAF7",
        fontFamily: isMemo ? "'Courier New', Courier, monospace" : "inherit",
      }}
    >
      {isMemo ? (
        <pre className="whitespace-pre-wrap text-[#0A0A0A] text-xs leading-6">{text}</pre>
      ) : (
        <div className="space-y-3">
          {lines.map((line, i) => {
            if (i === 0 && line.startsWith("Subject:")) {
              return (
                <div key={i} className="border-b border-[#D8D4CC] pb-3 mb-4">
                  <span className="font-semibold text-[#0A0A0A]">{line}</span>
                </div>
              );
            }
            if (line.startsWith("- ")) {
              return <div key={i} className="pl-4 text-[#0A0A0A]">• {line.slice(2)}</div>;
            }
            if (line === "") return <div key={i} className="h-2" />;
            return <p key={i} className="text-[#0A0A0A]">{line}</p>;
          })}
        </div>
      )}
    </div>
  );
}

// ─── Vocab popup ─────────────────────────────────────────────────────────────
function VocabChip({ word, def, defEs, lang }: VocabDef & { lang: "en" | "es" }) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="underline decoration-dotted decoration-[#2B5CE6] text-[#2B5CE6] cursor-pointer font-medium"
      >
        {word}
      </button>
      {open && (
        <span
          className="absolute z-20 bottom-full left-0 mb-1 w-56 border border-[#D8D4CC] bg-white p-3 text-xs text-[#0A0A0A] shadow-sm"
          style={{ minWidth: "14rem" }}
        >
          <strong className="block text-[#2B5CE6] mb-1">{word}</strong>
          {lang === "en" ? def : defEs}
          <button onClick={() => setOpen(false)} className="ml-2 text-[#888880] hover:text-[#0A0A0A]">✕</button>
        </span>
      )}
    </span>
  );
}

// ─── Type badge ───────────────────────────────────────────────────────────────
const TYPE_LABELS: Record<string, { en: string; es: string }> = {
  email: { en: "Email", es: "Correo" },
  memo: { en: "Memo", es: "Memorándum" },
  report: { en: "Report", es: "Informe" },
  procedure: { en: "Procedure", es: "Procedimiento" },
  notice: { en: "Notice", es: "Aviso" },
};

// ─── Main page ────────────────────────────────────────────────────────────────
type ReadingLevel = "standard" | "advanced";
const readingLevel = (id: string): ReadingLevel => id.includes("-adv-") ? "advanced" : "standard";

export default function ReadingPage() {
  const { lang, toggleLang, completedReadings, completeReading, profile } = useAppStore();
  const [selected, setSelected]     = useState<ReadingExercise | null>(null);
  const [docLang, setDocLang]       = useState<"en" | "es">("en");
  const [answers, setAnswers]       = useState<Record<number, number>>({});
  const [checked, setChecked]       = useState(false);
  const [activeVocab, setActiveVocab] = useState<string | null>(null);
  const [levelFilter, setLevelFilter] = useState<ReadingLevel | null>(null);
  const [industryFilter, setIndustryFilter] = useState<string | null>(profile?.industry ?? null);

  const T = {
    title: lang === "en" ? "Reading Practice" : "Práctica de Lectura",
    back: lang === "en" ? "← Back" : "← Atrás",
    selectPrompt: lang === "en" ? "Select an exercise to begin" : "Selecciona un ejercicio para comenzar",
    checkAnswers: lang === "en" ? "Check Answers" : "Verificar Respuestas",
    markComplete: lang === "en" ? "Mark Complete ✓" : "Marcar Completo ✓",
    completed: lang === "en" ? "Completed ✓" : "Completado ✓",
    score: (c: number, t: number) => lang === "en" ? `Score: ${c} / ${t} correct` : `Puntaje: ${c} / ${t} correctas`,
    showEN: "EN",
    showES: "ES",
    vocabTitle: lang === "en" ? "Key Vocabulary" : "Vocabulario Clave",
    questions: lang === "en" ? "Comprehension Questions" : "Preguntas de Comprensión",
  };

  const score = checked
    ? selected?.questions.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0) ?? 0
    : 0;

  function handleSelect(ex: ReadingExercise) {
    setSelected(ex);
    setAnswers({});
    setChecked(false);
    setDocLang("en");
  }

  // Vocab relevant to current exercise
  const relevantVocab = selected
    ? VOCAB.filter((v) => {
        const content = (selected.content + " " + selected.contentEs).toLowerCase();
        return content.includes(v.word.toLowerCase());
      })
    : [];

  return (
    <div className="min-h-screen" style={{ background: "#F0EDE6", color: "#0A0A0A" }}>
      {/* Nav */}
      <nav className="border-b border-[#D8D4CC] px-6 py-4 flex items-center justify-between" style={{ background: "#E8E4DC" }}>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-[#888880] hover:text-[#0A0A0A] transition-colors">{T.back}</Link>
          <span className="font-bold text-lg tracking-tight">{T.title}</span>
        </div>
        <button
          onClick={toggleLang}
          className="border border-[#D8D4CC] px-3 py-1 text-xs font-bold tracking-widest hover:border-[#2B5CE6] hover:text-[#2B5CE6] transition-colors"
        >
          {lang === "en" ? "ES" : "EN"}
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8 flex gap-8">
        {/* Exercise list */}
        <aside className="w-64 shrink-0">
          {/* Industry filter */}
          <div className="flex gap-1.5 mb-2 flex-wrap">
            <button onClick={() => setIndustryFilter(null)} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ border: "1.5px solid #D8D4CC", background: industryFilter === null ? "#0A0A0A" : "transparent", color: industryFilter === null ? "#F0EDE6" : "#0A0A0A" }}>
              {lang === "en" ? "All" : "Todas"}
            </button>
            {INDUSTRIES.map((ind) => (
              <button key={ind.id} onClick={() => setIndustryFilter(ind.id)} className="px-2 py-0.5 text-[10px] font-bold" style={{ border: `1.5px solid ${industryFilter === ind.id ? "#2B5CE6" : "#D8D4CC"}`, background: industryFilter === ind.id ? "#2B5CE6" : "transparent", color: industryFilter === ind.id ? "#fff" : "#0A0A0A" }}>
                {ind.icon}
              </button>
            ))}
          </div>
          {/* Level filter */}
          <div className="flex gap-2 mb-3 flex-wrap">
            <button onClick={() => setLevelFilter(null)} className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors" style={{ border: "1.5px solid #D8D4CC", background: levelFilter === null ? "#0A0A0A" : "transparent", color: levelFilter === null ? "#F0EDE6" : "#0A0A0A" }}>
              {lang === "en" ? "All" : "Todos"}
            </button>
            <button onClick={() => setLevelFilter("standard")} className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors" style={{ border: "1.5px solid #22863a", background: levelFilter === "standard" ? "#22863a" : "transparent", color: levelFilter === "standard" ? "#fff" : "#22863a" }}>
              {lang === "en" ? "Standard" : "Estándar"}
            </button>
            <button onClick={() => setLevelFilter("advanced")} className="px-2 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors" style={{ border: "1.5px solid #c0392b", background: levelFilter === "advanced" ? "#c0392b" : "transparent", color: levelFilter === "advanced" ? "#fff" : "#c0392b" }}>
              {lang === "en" ? "Advanced" : "Avanzado"}
            </button>
          </div>
          <div className="space-y-2">
          {READINGS.filter((ex) => {
            if (industryFilter && ex.industry !== industryFilter) return false;
            if (levelFilter && readingLevel(ex.id) !== levelFilter) return false;
            return true;
          }).map((ex) => {
            const done = completedReadings.includes(ex.id);
            const active = selected?.id === ex.id;
            const isAdv = readingLevel(ex.id) === "advanced";
            return (
              <button
                key={ex.id}
                onClick={() => handleSelect(ex)}
                className="w-full text-left border p-4 transition-colors"
                style={{
                  background: active ? "#2B5CE6" : "#E8E4DC",
                  borderColor: active ? "#2B5CE6" : "#D8D4CC",
                  color: active ? "#fff" : "#0A0A0A",
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: active ? "rgba(255,255,255,0.7)" : "#888880" }}>
                    {TYPE_LABELS[ex.type]?.[lang] ?? ex.type}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wide px-1" style={{ border: `1px solid ${isAdv ? "#c0392b" : "#22863a"}`, color: active ? "#fff" : (isAdv ? "#c0392b" : "#22863a"), borderColor: active ? "rgba(255,255,255,0.4)" : undefined }}>
                    {isAdv ? (lang === "en" ? "ADV" : "AVZ") : (lang === "en" ? "STD" : "EST")}
                  </span>
                </div>
                <div className="font-semibold text-sm leading-snug">
                  {lang === "en" ? ex.title : ex.titleEs}
                </div>
                <div className="text-xs mt-1" style={{ color: active ? "rgba(255,255,255,0.6)" : "#888880" }}>
                  {ex.industry} {done ? "✓" : ""}
                </div>
              </button>
            );
          })}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {!selected ? (
            <div className="border border-dashed border-[#D8D4CC] p-12 text-center text-[#888880]">
              {T.selectPrompt}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Document header */}
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold tracking-tight">
                  {lang === "en" ? selected.title : selected.titleEs}
                </h1>
                <div className="flex border border-[#D8D4CC]">
                  {(["en", "es"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setDocLang(l)}
                      className="px-3 py-1 text-xs font-bold tracking-widest transition-colors"
                      style={{
                        background: docLang === l ? "#2B5CE6" : "#E8E4DC",
                        color: docLang === l ? "#fff" : "#888880",
                      }}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Document */}
              <DocumentView exercise={selected} lang={docLang} />

              {/* Key vocab */}
              {relevantVocab.length > 0 && (
                <div>
                  <div className="text-xs font-bold tracking-widest uppercase text-[#888880] mb-2">{T.vocabTitle}</div>
                  <div className="flex flex-wrap gap-2">
                    {relevantVocab.map((v) => (
                      <VocabChip key={v.word} {...v} lang={lang} />
                    ))}
                  </div>
                </div>
              )}

              {/* Questions */}
              <div>
                <div className="text-xs font-bold tracking-widest uppercase text-[#888880] mb-4">{T.questions}</div>
                <div className="space-y-5">
                  {selected.questions.map((q, qi) => (
                    <div key={qi} className="border border-[#D8D4CC] p-4" style={{ background: "#E8E4DC" }}>
                      <p className="font-semibold text-sm mb-3">
                        {qi + 1}. {lang === "en" ? q.question : q.questionEs}
                      </p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          const selected_ = answers[qi] === oi;
                          const correct = checked && oi === q.correct;
                          const wrong = checked && selected_ && oi !== q.correct;
                          return (
                            <label
                              key={oi}
                              className="flex items-center gap-3 cursor-pointer text-sm px-3 py-2 border transition-colors"
                              style={{
                                borderColor: correct ? "#2B5CE6" : wrong ? "#CC3333" : "#D8D4CC",
                                background: correct ? "#EEF2FF" : wrong ? "#FFF0F0" : "#FAFAF7",
                              }}
                            >
                              <input
                                type="radio"
                                name={`q${qi}`}
                                disabled={checked}
                                checked={selected_}
                                onChange={() => setAnswers({ ...answers, [qi]: oi })}
                                className="accent-[#2B5CE6]"
                              />
                              {opt}
                              {correct && <span className="ml-auto text-[#2B5CE6] font-bold text-xs">✓</span>}
                              {wrong && <span className="ml-auto text-red-600 font-bold text-xs">✗</span>}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 pt-2">
                {!checked ? (
                  <button
                    onClick={() => setChecked(true)}
                    disabled={Object.keys(answers).length < selected.questions.length}
                    className="border border-[#2B5CE6] px-5 py-2 text-sm font-bold text-[#2B5CE6] tracking-wide hover:bg-[#2B5CE6] hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {T.checkAnswers}
                  </button>
                ) : (
                  <>
                    <div className="border border-[#D8D4CC] px-4 py-2 text-sm font-semibold" style={{ background: "#E8E4DC" }}>
                      {T.score(score, selected.questions.length)}
                    </div>
                    {!completedReadings.includes(selected.id) ? (
                      <button
                        onClick={() => completeReading(selected.id)}
                        className="border border-[#0A0A0A] px-5 py-2 text-sm font-bold bg-[#0A0A0A] text-white tracking-wide hover:bg-[#2B5CE6] hover:border-[#2B5CE6] transition-colors"
                      >
                        {T.markComplete}
                      </button>
                    ) : (
                      <span className="text-sm font-bold text-[#888880]">{T.completed}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
