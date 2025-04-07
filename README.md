# Single Sign-On Demo mit Next.js und Firebase

Dieses Projekt veranschaulicht, wie man Single Sign-On (SSO) mit Next.js und Firebase Authentication umsetzt. Es beinhaltet die Implementierung des Google-Logins sowie eine rollenbasierte Autorisierung.

## Was ist OAuth und welches Problem löst es?

OAuth (Open Authorization) ist ein offener Standard, der eine tokenbasierte Authentifizierung und Autorisierung im Web ermöglicht. Mit OAuth werden folgende wesentliche Herausforderungen adressiert:

1. **Sichere delegierte Zugriffsrechte**: Drittanbieteranwendungen können im Auftrag des Benutzers auf Ressourcen zugreifen, ohne dessen Anmeldedaten zu benötigen.
2. **Vermeidung von Passwort-Sharing**: Benutzer müssen ihre Passwörter nicht an verschiedene Dienste weitergeben, wodurch potenzielle Sicherheitsrisiken minimiert werden.
3. **Widerrufbarer Zugriff**: Erteilte Zugriffsrechte können begrenzt und bei Bedarf jederzeit zurückgezogen werden.
4. **Dienstübergreifende Authentifizierung**: Eine einzige Anmeldung ermöglicht den Zugriff auf mehrere Dienste (Single Sign-On).
5. **Zentralisierte Identitätsverwaltung**: Die zentrale Steuerung der Authentifizierung vereinfacht die Verwaltung von Benutzerkonten erheblich.

## Was übernimmt Firebase und was haben wir selbst realisiert?

### Funktionen, die Firebase bereitstellt:

- **Authentifizierungsinfrastruktur**: Firebase stellt eine stabile Grundlage für die Benutzerauthentifizierung zur Verfügung.
- **OAuth-Provider-Integration**: Fertig implementierte Integration mit Google, Facebook und weiteren Identitätsanbietern.
- **Sichere Token-Verwaltung**: Firebase erstellt, überprüft und erneuert JWT-Tokens automatisch.
- **Verwaltung von Benutzersitzungen**: Sitzungen werden geräteübergreifend verwaltet.
- **Grundlegende Benutzerprofilverwaltung**: Basisinformationen wie Name, E-Mail und Profilbild werden gespeichert.
- **Integrierte Sicherheitsmechanismen**: Es werden Schutzmaßnahmen gegen CSRF, XSS und andere Angriffe geboten.

### Eigene Implementierungen:

1. **Authentication Context (AuthContext.tsx)**:
   - Erstellung eines React Contexts zur zentralen Verwaltung des Authentifizierungsstatus.
   - Implementierung eines Auth-Providers, der Firebase-Auth kapselt und eine konsistente API für die Anwendung bereitstellt.
   - Bereitstellung eines Custom Hooks `useAuth()`, um den Zugriff auf Authentifizierungsfunktionen in Komponenten zu vereinfachen.

2. **Geschützte Routen (ProtectedRoute.tsx, AdminRoute.tsx)**:
   - Komponenten, die sicherstellen, dass nur authentifizierte Benutzer auf bestimmte Seiten zugreifen können.
   - Automatische Weiterleitung nicht authentifizierter Nutzer zur Login-Seite.
   - Spezielle AdminRoute-Komponente zur Kontrolle des Zugriffs auf administrative Funktionen.

3. **API-Middleware für den Backend-Schutz (middleware.ts)**:
   - Serverseitige Validierung der Firebase-Tokens.
   - Funktionen wie `withAuth` und `withAdmin` zur Sicherung der API-Endpunkte.

4. **Rollenbasierte Zugriffskontrolle**:
   - Integration mit Firestore zur Speicherung und Abfrage von Benutzerrollen.
   - Umsetzung der Logik, die den Zugriff basierend auf den Benutzerrollen regelt.

5. **Benutzererfahrung und UI**:
   - Anzeige des aktuellen Authentifizierungsstatus.
   - Benutzerfreundliche Darstellungen von Ladezuständen und Fehlermeldungen.
   - Responsives Design, das sich an verschiedene Endgeräte anpasst.

## Technische Umsetzung mit Next.js

### 1. Frontend-Authentifizierung mit React Context

```typescript
// lib/AuthContext.tsx (Auszug)
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Beobachter zur Erfassung von Authentifizierungsänderungen
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      setUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  // Anmeldung über Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Fehler bei der Anmeldung mit Google', error);
    }
  };
  
  // ... weitere Authentifizierungsfunktionen ...

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 2. Implementierung von geschützten Routen

```typescript
// components/ProtectedRoute.tsx (Auszug)
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Laden...</div>;
  }

  return user ? <>{children}</> : null;
};
```

### 3. API-Routenschutz mit Firebase Admin SDK

```typescript
// lib/middleware.ts (Auszug)
export const withAuth = (handler: AuthenticatedHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Auth-Token aus dem Authorization-Header auslesen
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Nicht autorisiert: Fehlender oder ungültiger Token' });
      }

      const token = authHeader.split('Bearer ')[1];
      
      try {
        // Token verifizieren
        const decodedToken = await auth.verifyIdToken(token);
        
        // Handler mit verifiziertem Token aufrufen
        return handler(req, res, decodedToken);
      } catch (error) {
        return res.status(401).json({ error: 'Nicht autorisiert: Ungültiger Token' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Interner Serverfehler' });
    }
  };
};
```

## Projektstruktur

```
sso-demo/
├── components/                # React-Komponenten
│   ├── AdminRoute.tsx         # Routenschutz für Admins
│   ├── ProtectedRoute.tsx     # Authentifizierungs-Routenschutz
│   ├── FirebaseStatus.tsx     # Anzeige des Firebase-Verbindungsstatus
├── lib/                       # Hilfsfunktionen und Konfigurationen
│   ├── AuthContext.tsx        # Authentifizierungs-Context Provider
│   ├── firebase.ts            # Firebase-Konfiguration
│   ├── middleware.ts          # Middleware für den API-Routenschutz
├── pages/                     # Next.js-Seiten
│   ├── _app.tsx               # Haupt-App-Komponente
│   ├── index.tsx              # Geschützte Startseite
│   ├── login.tsx              # Login-Seite
│   ├── admin.tsx              # Admin-Dashboard (rollengeschützt)
│   ├── unauthorized.tsx       # Seite bei Zugriffsverweigerung
│   ├── api/                   # API-Routen
│       ├── protected-data.ts  # Geschützte API-Route
│       ├── admin/             # API-Routen nur für Admins
├── public/                    # Statische Assets
├── styles/                    # CSS-Styles
```

## Einrichtungsanleitung

1. **Repository klonen**

```bash
git clone https://github.com/[dein-benutzername]/sso-demo.git
cd sso-demo
```

2. **Abhängigkeiten installieren**

```bash
npm install
```

3. **Firebase einrichten**

- Erstelle ein Firebase-Projekt in der [Firebase Console](https://console.firebase.google.com/)
- Aktiviere Authentication und Firestore
- Füge Google als Authentication-Provider hinzu
- Erstelle eine `.env.local` Datei mit deiner Firebase-Konfiguration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=dein-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dein-projekt.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dein-projekt-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dein-projekt.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=deine-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=deine-app-id
```

4. **Entwicklungsserver starten**

```bash
npm run dev
```

5. **Browser öffnen**

Navigiere zu [http://localhost:3000]

## Admin-Benutzer einrichten

Um einen Admin-Benutzer anzulegen:

- Melde dich mit Google an.
- Öffne in der Firebase Console die Firestore-Datenbank.
- Erstelle, falls noch nicht vorhanden, die Collection "users".
- Füge ein Dokument hinzu, das der UID des Benutzers entspricht.
- Ergänze ein Feld "role" mit dem Wert "admin".

## Sicherheitsaspekte

- **JWT-Verifizierung**: Alle Tokens werden client- und serverseitig validiert.
- **CSRF-Schutz**: Es kommen die eingebauten Schutzmechanismen von Firebase zum Einsatz.
- **XSS-Schutz**: React bietet standardmäßig einen wirksamen Schutz gegen XSS.
- **Rollenbasierter Zugriff**: Unbefugter Zugriff auf Admin-Funktionen wird durch eine rollenbasierte Zugriffskontrolle verhindert.

## Fazit

Die Umsetzung von OAuth mit Firebase in einer Next.js-Anwendung bietet eine zuverlässige und sichere Authentifizierungslösung. Während Firebase viele komplexe Aufgaben übernimmt, haben wir die Integration in die Frontend-Architektur selbst umgesetzt. Mithilfe von React Context und Next.js-Routing wird eine nahtlose Benutzererfahrung geschaffen, und durch serverseitige Validierung sowie rollenbasierte Zugriffskontrolle wird die Sicherheit der Anwendung gewährleistet.


