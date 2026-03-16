export type Locale = 'en' | 'es' | 'pt';

export interface Translation {
  nav: {
    clubName: string;
    register: string;
  };
  hero: {
    est: string;
    line1: string;
    line2: string;
    sub: string;
    urgency: string;
    leaguesLabel: string;
  };
  form: {
    title: string;
    titleAccent: string;
    subtitle: string;
    fields: {
      playerName: string;
      dob: string;
      ageGroup: string;
      selectAgeGroup: string;
      position: string;
      selectPosition: string;
      parentName: string;
      parentEmail: string;
      parentPhone: string;
      cityState: string;
      currentClub: string;
      currentClubPlaceholder: string;
      hearAbout: string;
      selectHearAbout: string;
      anythingElse: string;
      options: {
        positions: string[];
        hearAbout: string[];
      };
    };
    divider: string;
    submit: string;
    trust: string[];
    success: {
      title: string;
      body: string;
      reset: string;
    };
  };
  stats: {
    years: string;
    players: string;
    championships: string;
    ageGroups: string;
  };
  value: {
    tag: string;
    title: string;
    cards: {
      title: string;
      body: string;
    }[];
  };
  testimonials: {
    tag: string;
    title: string;
    cards: {
      quote: string;
      name: string;
      role: string;
    }[];
  };
  faq: {
    tag: string;
    title: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  cta: {
    line1: string;
    line2: string;
    button: string;
  };
  footer: {
    rights: string;
    email: string;
    contact: string;
  };
}

export const translations: Record<Locale, Translation> = {
  en: {
    nav: {
      clubName: "COVERED BRIDGE SC",
      register: "REGISTER →"
    },
    hero: {
      est: "Soccer Club · Est. Georgia",
      line1: "TRYOUTS ARE",
      line2: "NOW OPEN",
      sub: "Limited spots. Elite coaches. Your next level starts here.",
      urgency: "LIVE: 4 players are registering right now",
      leaguesLabel: "WE COMPETE IN"
    },
    form: {
      title: "REGISTER FOR",
      titleAccent: "TRYOUTS",
      subtitle: "Free to apply · No commitment · Reply within 48hrs",
      fields: {
        playerName: "Player Full Name *",
        dob: "Date of Birth *",
        ageGroup: "Age Group *",
        selectAgeGroup: "Select Age Group",
        position: "Primary Position *",
        selectPosition: "Select Position",
        parentName: "Parent/Guardian Name *",
        parentEmail: "Parent Email *",
        parentPhone: "Parent Phone *",
        cityState: "City / State *",
        currentClub: "Current Club (if any)",
        currentClubPlaceholder: "Club name or 'None / Unattached'",
        hearAbout: "How did you hear about us? *",
        selectHearAbout: "Select an option",
        anythingElse: "Anything else we should know?",
        options: {
          positions: ["Goalkeeper (GK)", "Defender", "Midfielder", "Forward / Winger", "Any Position"],
          hearAbout: ["Instagram / Social Media", "Coach or Trainer", "Friend or Teammate", "Google Search", "TikTok", "YouTube", "Other"]
        }
      },
      divider: "PARENT INFORMATION",
      submit: "SUBMIT MY APPLICATION →",
      trust: ["No payment required", "No spam, ever", "48hr response"],
      success: {
        title: "YOU'RE IN THE QUEUE!",
        body: "Check your email — we'll reach out within 48 hours with your tryout details.",
        reset: "Submit another registration →"
      }
    },
    stats: {
      years: "Years Training Elite",
      players: "Players Developed",
      championships: "League Championships",
      ageGroups: "All Age Groups Open"
    },
    value: {
      tag: "WHY CHOOSE US",
      title: "THE ELITE DIFFERENCE",
      cards: [
        {
          title: "PRO-LEVEL COACHING",
          body: "Train under UEFA & USSF licensed coaches with professional playing experience. We don't just run drills; we teach the modern game."
        },
        {
          title: "ELITE COMPETITION",
          body: "Compete in the highest regional and national leagues including MLS Next, UPSL, and USYS. Exposure to college and pro scouts."
        },
        {
          title: "PATHWAY TO PRO",
          body: "Direct connections to collegiate programs and professional academies. Our alumni currently play in NCAA D1 and professional leagues."
        }
      ]
    },
    testimonials: {
      tag: "SUCCESS STORIES",
      title: "HEAR FROM OUR PLAYERS",
      cards: [
        {
          quote: "The coaching staff completely transformed my understanding of the game. I went from a bench player to starting varsity in one season.",
          name: "Marcus T.",
          role: "U17 Forward"
        },
        {
          quote: "Covered Bridge SC gave me the exposure I needed. The college showcases we attended directly led to my D1 scholarship offer.",
          name: "Sarah J.",
          role: "Alumni, NCAA D1"
        },
        {
          quote: "It's more than a club, it's a family that pushes you to be your absolute best every single training session.",
          name: "David M.",
          role: "U15 Midfielder"
        }
      ]
    },
    faq: {
      tag: "GOT QUESTIONS?",
      title: "FREQUENTLY ASKED QUESTIONS",
      items: [
        {
          q: "When are the tryouts held?",
          a: "Tryouts are typically held in late May and early June. Specific dates for each age group will be emailed to you after registration."
        },
        {
          q: "What is the cost to register for tryouts?",
          a: "Tryout registration is 100% free. There is no commitment required to attend."
        },
        {
          q: "What should players bring to tryouts?",
          a: "Players should arrive 30 minutes early with cleats, shin guards, a properly inflated ball, and plenty of water. Wear a plain white or grey t-shirt."
        },
        {
          q: "How many teams are formed per age group?",
          a: "We typically form 2-3 teams per age group (Elite, Premier, and Select) to ensure players compete at the appropriate developmental level."
        },
        {
          q: "When will we know the results?",
          a: "Coaches will reach out with offers within 48 hours of your final tryout session. You will have 24 hours to accept the spot."
        },
        {
          q: "Do you offer financial aid?",
          a: "Yes, Covered Bridge SC is committed to making elite soccer accessible. Financial aid applications are available upon making a team."
        }
      ]
    },
    cta: {
      line1: "DON'T MISS YOUR",
      line2: "WINDOW",
      button: "APPLY NOW →"
    },
    footer: {
      rights: "© 2024 Covered Bridge SC. All rights reserved.",
      email: "info@coveredbridgesc.com",
      contact: "Contact Us"
    }
  },
  es: {
    nav: {
      clubName: "COVERED BRIDGE SC",
      register: "REGISTRARSE →"
    },
    hero: {
      est: "Club de Fútbol · Est. Georgia",
      line1: "TRYOUTS",
      line2: "AHORA ABIERTOS",
      sub: "Cupos limitados. Entrenadores de élite. Tu próximo nivel empieza aquí.",
      urgency: "EN VIVO: 4 jugadores registrándose ahora",
      leaguesLabel: "COMPETIMOS EN"
    },
    form: {
      title: "REGÍSTRATE AL",
      titleAccent: "TRYOUT",
      subtitle: "Gratis · Sin compromiso · Respuesta en 48hrs",
      fields: {
        playerName: "Nombre Completo del Jugador *",
        dob: "Fecha de Nacimiento *",
        ageGroup: "Grupo de Edad *",
        selectAgeGroup: "Seleccionar Grupo de Edad",
        position: "Posición Principal *",
        selectPosition: "Seleccionar Posición",
        parentName: "Nombre del Padre/Madre *",
        parentEmail: "Correo del Padre/Madre *",
        parentPhone: "Teléfono *",
        cityState: "Ciudad / Estado *",
        currentClub: "Club Actual (si aplica)",
        currentClubPlaceholder: "Nombre del club o 'Ninguno'",
        hearAbout: "¿Cómo nos conociste? *",
        selectHearAbout: "Seleccionar una opción",
        anythingElse: "¿Algo más que debamos saber?",
        options: {
          positions: ["Portero (GK)", "Defensa", "Centrocampista", "Delantero / Extremo", "Cualquier posición"],
          hearAbout: ["Instagram / Redes sociales", "Entrenador", "Amigo / Compañero", "Google", "TikTok", "YouTube", "Otro"]
        }
      },
      divider: "INFORMACIÓN DEL PADRE/MADRE",
      submit: "ENVIAR MI SOLICITUD →",
      trust: ["Sin pago requerido", "Sin spam", "Respuesta en 48hrs"],
      success: {
        title: "¡ESTÁS DENTRO!",
        body: "Revisa tu correo — te contactaremos en 48 horas con los detalles de tu prueba.",
        reset: "Enviar otro registro →"
      }
    },
    stats: {
      years: "Años Entrenamiento Élite",
      players: "Jugadores Desarrollados",
      championships: "Títulos de Liga",
      ageGroups: "Todos los Grupos Abiertos"
    },
    value: {
      tag: "POR QUÉ ELEGIRNOS",
      title: "LA DIFERENCIA ÉLITE",
      cards: [
        {
          title: "ENTRENAMIENTO NIVEL PRO",
          body: "Entrena con entrenadores con licencia UEFA y USSF con experiencia profesional. No solo hacemos ejercicios; enseñamos el juego moderno."
        },
        {
          title: "COMPETICIÓN DE ÉLITE",
          body: "Compite en las mejores ligas regionales y nacionales, incluyendo MLS Next, UPSL y USYS. Exposición a ojeadores universitarios y profesionales."
        },
        {
          title: "CAMINO A PROFESIONAL",
          body: "Conexiones directas con programas universitarios y academias profesionales. Nuestros exalumnos juegan actualmente en la NCAA D1 y ligas profesionales."
        }
      ]
    },
    testimonials: {
      tag: "CASOS DE ÉXITO",
      title: "ESCUCHA A NUESTROS JUGADORES",
      cards: [
        {
          quote: "El cuerpo técnico transformó por completo mi comprensión del juego. Pasé de ser suplente a titular en el equipo universitario en una temporada.",
          name: "Marcus T.",
          role: "Delantero U17"
        },
        {
          quote: "Covered Bridge SC me dio la exposición que necesitaba. Las exhibiciones universitarias a las que asistimos me llevaron directamente a mi beca D1.",
          name: "Sarah J.",
          role: "Exalumna, NCAA D1"
        },
        {
          quote: "Es más que un club, es una familia que te empuja a ser tu mejor versión en cada sesión de entrenamiento.",
          name: "David M.",
          role: "Centrocampista U15"
        }
      ]
    },
    faq: {
      tag: "¿TIENES PREGUNTAS?",
      title: "PREGUNTAS FRECUENTES",
      items: [
        {
          q: "¿Cuándo se realizan las pruebas?",
          a: "Las pruebas generalmente se llevan a cabo a fines de mayo y principios de junio. Las fechas específicas para cada grupo de edad se enviarán por correo electrónico después del registro."
        },
        {
          q: "¿Cuál es el costo de inscripción para las pruebas?",
          a: "El registro para las pruebas es 100% gratuito. No hay compromiso requerido para asistir."
        },
        {
          q: "¿Qué deben llevar los jugadores a las pruebas?",
          a: "Los jugadores deben llegar 30 minutos antes con tacos, espinilleras, un balón inflado adecuadamente y mucha agua. Llevar una camiseta lisa blanca o gris."
        },
        {
          q: "¿Cuántos equipos se forman por grupo de edad?",
          a: "Normalmente formamos de 2 a 3 equipos por grupo de edad (Élite, Premier y Select) para asegurar que los jugadores compitan en el nivel de desarrollo adecuado."
        },
        {
          q: "¿Cuándo sabremos los resultados?",
          a: "Los entrenadores se comunicarán con ofertas dentro de las 48 horas posteriores a su última sesión de prueba. Tendrá 24 horas para aceptar el cupo."
        },
        {
          q: "¿Ofrecen ayuda financiera?",
          a: "Sí, Covered Bridge SC se compromete a hacer que el fútbol de élite sea accesible. Las solicitudes de ayuda financiera están disponibles al formar parte de un equipo."
        }
      ]
    },
    cta: {
      line1: "NO PIERDAS TU",
      line2: "OPORTUNIDAD",
      button: "APLICAR AHORA →"
    },
    footer: {
      rights: "© 2024 Covered Bridge SC. Todos los derechos reservados.",
      email: "info@coveredbridgesc.com",
      contact: "Contáctanos"
    }
  },
  pt: {
    nav: {
      clubName: "COVERED BRIDGE SC",
      register: "CADASTRAR →"
    },
    hero: {
      est: "Clube de Futebol · Est. Georgia",
      line1: "TRYOUTS",
      line2: "AGORA ABERTOS",
      sub: "Vagas limitadas. Treinadores de elite. Seu próximo nível começa aqui.",
      urgency: "AO VIVO: 4 jogadores se cadastrando agora",
      leaguesLabel: "COMPETIMOS EM"
    },
    form: {
      title: "CADASTRE-SE NO",
      titleAccent: "TRYOUT",
      subtitle: "Gratuito · Sem compromisso · Resposta em 48hrs",
      fields: {
        playerName: "Nome Completo do Jogador *",
        dob: "Data de Nascimento *",
        ageGroup: "Faixa Etária *",
        selectAgeGroup: "Selecionar Faixa Etária",
        position: "Posição Principal *",
        selectPosition: "Selecionar Posição",
        parentName: "Nome do Responsável *",
        parentEmail: "Email do Responsável *",
        parentPhone: "Telefone *",
        cityState: "Cidade / Estado *",
        currentClub: "Clube Atual (se houver)",
        currentClubPlaceholder: "Nome do clube ou 'Nenhum'",
        hearAbout: "Como nos conheceu? *",
        selectHearAbout: "Selecione uma opção",
        anythingElse: "Mais alguma coisa que devamos saber?",
        options: {
          positions: ["Goleiro (GK)", "Zagueiro / Lateral", "Meia", "Atacante / Ponta", "Qualquer posição"],
          hearAbout: ["Instagram / Redes sociais", "Treinador", "Amigo / Colega", "Google", "TikTok", "YouTube", "Outro"]
        }
      },
      divider: "INFORMAÇÕES DO RESPONSÁVEL",
      submit: "ENVIAR MINHA INSCRIÇÃO →",
      trust: ["Sem pagamento", "Sem spam", "Resposta em 48hrs"],
      success: {
        title: "VOCÊ ESTÁ DENTRO!",
        body: "Verifique seu email — entraremos em contato em 48 horas com os detalhes do seu tryout.",
        reset: "Enviar outro cadastro →"
      }
    },
    stats: {
      years: "Anos de Treinamento Elite",
      players: "Atletas Desenvolvidos",
      championships: "Títulos de Liga",
      ageGroups: "Todas as Faixas Abertas"
    },
    value: {
      tag: "POR QUE NOS ESCOLHER",
      title: "A DIFERENÇA ELITE",
      cards: [
        {
          title: "TREINAMENTO NÍVEL PRO",
          body: "Treine com técnicos licenciados pela UEFA e USSF com experiência profissional. Não fazemos apenas treinos; ensinamos o jogo moderno."
        },
        {
          title: "COMPETIÇÃO DE ELITE",
          body: "Compita nas melhores ligas regionais e nacionais, incluindo MLS Next, UPSL e USYS. Exposição a olheiros universitários e profissionais."
        },
        {
          title: "CAMINHO PARA O PROFISSIONAL",
          body: "Conexões diretas com programas universitários e academias profissionais. Nossos ex-alunos jogam atualmente na NCAA D1 e ligas profissionais."
        }
      ]
    },
    testimonials: {
      tag: "HISTÓRIAS DE SUCESSO",
      title: "OUÇA NOSSOS JOGADORES",
      cards: [
        {
          quote: "A equipe técnica transformou completamente minha compreensão do jogo. Fui de reserva a titular no time principal em uma temporada.",
          name: "Marcus T.",
          role: "Atacante U17"
        },
        {
          quote: "Covered Bridge SC me deu a exposição que eu precisava. Os eventos universitários que participamos me levaram diretamente à minha bolsa D1.",
          name: "Sarah J.",
          role: "Ex-aluna, NCAA D1"
        },
        {
          quote: "É mais do que um clube, é uma família que te impulsiona a ser o seu melhor em cada sessão de treinamento.",
          name: "David M.",
          role: "Meia U15"
        }
      ]
    },
    faq: {
      tag: "TEM PERGUNTAS?",
      title: "PERGUNTAS FREQUENTES",
      items: [
        {
          q: "Quando as seletivas são realizadas?",
          a: "As seletivas geralmente ocorrem no final de maio e início de junho. As datas específicas para cada faixa etária serão enviadas por email após o cadastro."
        },
        {
          q: "Qual é o custo para se inscrever nas seletivas?",
          a: "A inscrição para as seletivas é 100% gratuita. Não há compromisso exigido para participar."
        },
        {
          q: "O que os jogadores devem levar para as seletivas?",
          a: "Os jogadores devem chegar 30 minutos antes com chuteiras, caneleiras, uma bola bem cheia e muita água. Vista uma camiseta lisa branca ou cinza."
        },
        {
          q: "Quantos times são formados por faixa etária?",
          a: "Normalmente formamos de 2 a 3 times por faixa etária (Elite, Premier e Select) para garantir que os jogadores compitam no nível de desenvolvimento adequado."
        },
        {
          q: "Quando saberemos os resultados?",
          a: "Os treinadores entrarão em contato com ofertas dentro de 48 horas após a sua última sessão de seletiva. Você terá 24 horas para aceitar a vaga."
        },
        {
          q: "Vocês oferecem ajuda financeira?",
          a: "Sim, o Covered Bridge SC está comprometido em tornar o futebol de elite acessível. Solicitações de ajuda financeira estão disponíveis ao entrar para um time."
        }
      ]
    },
    cta: {
      line1: "NÃO PERCA SUA",
      line2: "CHANCE",
      button: "INSCREVA-SE AGORA →"
    },
    footer: {
      rights: "© 2024 Covered Bridge SC. Todos os direitos reservados.",
      email: "info@coveredbridgesc.com",
      contact: "Fale Conosco"
    }
  }
};
