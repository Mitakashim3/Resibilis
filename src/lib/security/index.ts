/**
 * Security Utilities for Resibilis
 * Provides protection against various security threats
 */

// ============================================
// DISPOSABLE/TEMPORARY EMAIL DETECTION
// ============================================

// Common disposable email domains (regularly updated list)
// This is a subset - in production, use a service like kickbox.io or debounce.io
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  // Popular disposable email services
  '10minutemail.com',
  '10minutemail.net',
  'tempmail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'guerrillamail.org',
  'guerrillamail.net',
  'mailinator.com',
  'maildrop.cc',
  'throwaway.email',
  'throwawaymail.com',
  'fakeinbox.com',
  'tempinbox.com',
  'dispostable.com',
  'mailnesia.com',
  'mytrashmail.com',
  'sharklasers.com',
  'trashmail.com',
  'trashmail.net',
  'trashmail.org',
  'getnada.com',
  'yopmail.com',
  'yopmail.fr',
  'mohmal.com',
  'tempail.com',
  'emailondeck.com',
  'mintemail.com',
  'spamgourmet.com',
  'tempr.email',
  'discard.email',
  'discardmail.com',
  'spambog.com',
  'spambog.de',
  'spambog.ru',
  'mailcatch.com',
  'getairmail.com',
  'fakemailgenerator.com',
  'emailfake.com',
  'generator.email',
  'mailsac.com',
  'inboxkitten.com',
  'burnermail.io',
  'temp.email',
  'tempmailo.com',
  'fakemail.net',
  'emailtemporanea.com',
  'emailtemporanea.net',
  'crazymailing.com',
  'emkei.cz',
  '33mail.com',
  'amilegit.com',
  'anonymbox.com',
  'binkmail.com',
  'bobmail.info',
  'bofthew.com',
  'bumpymail.com',
  'bugmenot.com',
  'bund.us',
  'burnthespam.info',
  'buyusedlibrarybooks.org',
  'byom.de',
  'cachedot.net',
  'casualdx.com',
  'centermail.com',
  'chammy.info',
  'cheatmail.de',
  'choicemail1.com',
  'clixser.com',
  'correo.blogos.net',
  'cosmorph.com',
  'courriel.fr.nf',
  'curryworld.de',
  'cust.in',
  'cuvox.de',
  'dacoolest.com',
  'daintly.com',
  'dandikmail.com',
  'dayrep.com',
  'deadaddress.com',
  'deadfake.cf',
  'despam.it',
  'despammed.com',
  'devnullmail.com',
  'dfgh.net',
  'digitalsanctuary.com',
  'discardmail.de',
  'dispo.in',
  'disposable.com',
  'disposableaddress.com',
  'disposableemailaddresses.com',
  'disposableinbox.com',
  'dispose.it',
  'dodgeit.com',
  'dodgemail.de',
  'dodgit.com',
  'dontreg.com',
  'dontsendmespam.de',
  'drdrb.net',
  'dumpmail.de',
  'dumpyemail.com',
  'e4ward.com',
  'easytrashmail.com',
  'einrot.com',
  'email60.com',
  'emailgo.de',
  'emailias.com',
  'emailigo.de',
  'emailinfive.com',
  'emaillime.com',
  'emailmiser.com',
  'emailsensei.com',
  'emailtemporario.com.br',
  'emailthe.net',
  'emailtmp.com',
  'emailto.de',
  'emailwarden.com',
  'emailx.at.hm',
  'emailxfer.com',
  'emz.net',
  'enterto.com',
  'evopo.com',
  'explodemail.com',
  'express.net.ua',
  'eyepaste.com',
  'fakeinformation.com',
  'fansworldwide.de',
  'fastacura.com',
  'fastchevy.com',
  'fastchrysler.com',
  'fastkawasaki.com',
  'fastmazda.com',
  'fastmitsubishi.com',
  'fastnissan.com',
  'fastsubaru.com',
  'fastsuzuki.com',
  'fasttoyota.com',
  'fastyamaha.com',
  'filzmail.com',
  'fizmail.com',
  'flyspam.com',
  'footard.com',
  'forgetmail.com',
  'fr33mail.info',
  'frapmail.com',
  'friendlymail.co.uk',
  'front14.org',
  'fuckingduh.com',
  'fux0ringduh.com',
  'garliclife.com',
  'gehensiull.com',
  'get1mail.com',
  'get2mail.fr',
  'getonemail.com',
  'getonemail.net',
  'ghosttexter.de',
  'girlsundertheinfluence.com',
  'gishpuppy.com',
  'goemailgo.com',
  'gorillaswithdirtyarmpits.com',
  'gotmail.com',
  'gotmail.net',
  'gotmail.org',
  'gotti.otherinbox.com',
  'great-host.in',
  'greensloth.com',
  'grr.la',
  'gsrv.co.uk',
  'hacccc.com',
  'haltospam.com',
  'harakirimail.com',
  'hartbot.de',
  'hat-gansen.de',
  'herp.in',
  'hidemail.de',
  'hidzz.com',
  'hmamail.com',
  'hopemail.biz',
  'hotpop.com',
  'hulapla.de',
  'ieatspam.eu',
  'ieatspam.info',
  'ieh-mail.de',
  'ihateyoualot.info',
  'iheartspam.org',
  'imails.info',
  'imgof.com',
  'imgv.de',
  'incognitomail.com',
  'incognitomail.net',
  'incognitomail.org',
  'infocom.zp.ua',
  'insorg-mail.info',
  'instantemailaddress.com',
  'ipoo.org',
  'irish2me.com',
  'iwi.net',
  'jetable.com',
  'jetable.fr.nf',
  'jetable.net',
  'jetable.org',
  'jnxjn.com',
  'jobbikszansen.de',
  'jourrapide.com',
  'jsrsolutions.com',
  'kasmail.com',
  'kaspop.com',
  'keepmymail.com',
  'killmail.com',
  'killmail.net',
  'kir.ch.tc',
  'klassmaster.com',
  'klassmaster.net',
  'klzlv.com',
  'kulturbetrieb.info',
  'kurzepost.de',
  'letthemeatspam.com',
  'lhsdv.com',
  'lifebyfood.com',
  'link2mail.net',
  'litedrop.com',
  'lol.ovpn.to',
  'lookugly.com',
  'lopl.co.cc',
  'lortemail.dk',
  'lovemeleaveme.com',
  'lr7.us',
  'lr78.com',
  'lroid.com',
  'lukop.dk',
  'm4ilweb.info',
  'maboard.com',
  'mail-hierarchie.net',
  'mail-temporaire.fr',
  'mail.by',
  'mail.htl22.at',
  'mail.mezimages.net',
  'mail.zp.ua',
  'mail114.net',
  'mail2rss.org',
  'mail333.com',
  'mail4trash.com',
  'mailbidon.com',
  'mailblocks.com',
  'mailcatch.com',
  'mailde.de',
  'mailde.info',
  'mailexpire.com',
  'mailfa.tk',
  'mailin8r.com',
  'mailinater.com',
  'mailinator.net',
  'mailinator.org',
  'mailinator2.com',
  'mailincubator.com',
  'mailismagic.com',
  'mailme.ir',
  'mailme.lv',
  'mailme24.com',
  'mailmetrash.com',
  'mailmoat.com',
  'mailnator.com',
  'mailnull.com',
  'mailorg.org',
  'mailpick.biz',
  'mailrock.biz',
  'mailscrap.com',
  'mailshell.com',
  'mailsiphon.com',
  'mailslapping.com',
  'mailslite.com',
  'mailzilla.com',
  'mailzilla.org',
  'makemetheking.com',
  'manifestgenerator.com',
  'manybrain.com',
  'mbx.cc',
  'mega.zik.dj',
  'meinspamschutz.de',
  'meltmail.com',
  'messagebeamer.de',
  'mezimages.net',
  'mierdamail.com',
  'ministry-of-silly-walks.de',
  'moncourrier.fr.nf',
  'monemail.fr.nf',
  'monmail.fr.nf',
  'monumentmail.com',
  'ms9.mailslite.com',
  'msb.minsmail.com',
  'msa.minsmail.com',
  'mt2009.com',
  'mt2014.com',
  'mx0.wwwnew.eu',
  'myalias.pw',
  'mycleaninbox.net',
  'mynetstore.de',
  'mypacks.net',
  'mypartyclip.de',
  'myphantomemail.com',
  'myspaceinc.com',
  'myspaceinc.net',
  'myspacepimpedup.com',
  'mytempemail.com',
  'mytempmail.com',
  'neomailbox.com',
  'nepwk.com',
  'nervmich.net',
  'nervtmansen.de',
  'netzidiot.de',
  'neverbox.com',
  'nice-4u.com',
  'nincsmail.com',
  'nincsmail.hu',
  'nmail.cf',
  'nobulk.com',
  'noclickemail.com',
  'nogmailspam.info',
  'nomail.pw',
  'nomail.xl.cx',
  'nomail2me.com',
  'nomorespamemails.com',
  'nospam.ze.tc',
  'nospam4.us',
  'nospamfor.us',
  'nospammail.net',
  'nospamthanks.info',
  'notmailinator.com',
  'nowhere.org',
  'nowmymail.com',
  'nurfuerspam.de',
  'nus.edu.sg',
  'nwldx.com',
  'o2stk.org',
  'objectmail.com',
  'obobbo.com',
  'odnorazovoe.ru',
  'one-time.email',
  'oneoffemail.com',
  'onewaymail.com',
  'online.ms',
  'oopi.org',
  'opayq.com',
  'ordinaryamerican.net',
  'otherinbox.com',
  'ourklips.com',
  'outlawspam.com',
  'ovpn.to',
  'owlpic.com',
  'pancakemail.com',
  'pimpedupmyspace.com',
  'pjjkp.com',
  'plexolan.de',
  'poczta.onet.pl',
  'politikerclub.de',
  'poofy.org',
  'pookmail.com',
  'powered.name',
  'privacy.net',
  'privatdemail.net',
  'privy-mail.com',
  'privymail.de',
  'proxymail.eu',
  'prtnx.com',
  'punkass.com',
  'putthisinyourspamdatabase.com',
  'pwrby.com',
  'qasti.com',
  'qisdo.com',
  'qisoa.com',
  'quickinbox.com',
  'quickmail.nl',
  'rainmail.biz',
  'rcpt.at',
  'reallymymail.com',
  'realtyalerts.ca',
  'recode.me',
  'recursor.net',
  'recyclemail.dk',
  'regbypass.com',
  'regbypass.comsafe-mail.net',
  'rejectmail.com',
  'reliable-mail.com',
  'remail.cf',
  'remail.ga',
  'rippedmyemail.com',
  'rklips.com',
  'rmqkr.net',
  'royal.net',
  'rppkn.com',
  'rtrtr.com',
  's0ny.net',
  'safe-mail.net',
  'safetymail.info',
  'safetypost.de',
  'sandelf.de',
  'saynotospams.com',
  'schafmail.de',
  'schrott-email.de',
  'secretemail.de',
  'secure-mail.biz',
  'senseless-entertainment.com',
  'server.ms.selfip.net',
  'sharklasers.com',
  'shieldemail.com',
  'shiftmail.com',
  'shitmail.me',
  'shortmail.net',
  'shut.name',
  'shut.ws',
  'sibmail.com',
  'sify.com',
  'simplemail.info',
  'sinnlos-mail.de',
  'siteposter.net',
  'skeefmail.com',
  'slaskpost.se',
  'slave-auctions.net',
  'slopsbox.com',
  'slowslow.de',
  'slushmail.com',
  'smaakt.naar.gransen',
  'smashmail.de',
  'smellfear.com',
  'snakemail.com',
  'sneakemail.com',
  'sneakmail.de',
  'snkmail.com',
  'sofimail.com',
  'sofort-mail.de',
  'sogetthis.com',
  'solvemail.info',
  'soodomail.com',
  'soodonims.com',
  'spam.la',
  'spam.su',
  'spam4.me',
  'spamail.de',
  'spamavert.com',
  'spambob.com',
  'spambob.net',
  'spambob.org',
  'spambog.net',
  'spambox.info',
  'spambox.irishspringrealty.com',
  'spambox.us',
  'spamcannon.com',
  'spamcannon.net',
  'spamcero.com',
  'spamcon.org',
  'spamcorptastic.com',
  'spamcowboy.com',
  'spamcowboy.net',
  'spamcowboy.org',
  'spamday.com',
  'spamex.com',
  'spamfree.eu',
  'spamfree24.com',
  'spamfree24.de',
  'spamfree24.eu',
  'spamfree24.info',
  'spamfree24.net',
  'spamfree24.org',
  'spamgrube.info',
  'spamherelots.com',
  'spamhereplease.com',
  'spamhole.com',
  'spamify.com',
  'spaminator.de',
  'spamkill.info',
  'spaml.com',
  'spaml.de',
  'spammote.com',
  'spammotel.com',
  'spamobox.com',
  'spamoff.de',
  'spamsalad.in',
  'spamslicer.com',
  'spamspot.com',
  'spamthis.co.uk',
  'spamthisplease.com',
  'spamtrail.com',
  'spamtroll.net',
  'speed.1s.fr',
  'speedymail.org',
  'spoofmail.de',
  'squizzy.de',
  'ssoia.com',
  'startkeys.com',
  'stinkefinger.net',
  'stop-my-spam.cf',
  'stop-my-spam.com',
  'stop-my-spam.ga',
  'stop-my-spam.ml',
  'stop-my-spam.pp.ua',
  'stop-my-spam.tk',
  'streetwisemail.com',
  'stuffmail.de',
  'sudomail.biz',
  'sudomail.com',
  'sudomail.net',
  'supergreatmail.com',
  'supermailer.jp',
  'superrito.com',
  'superstachel.de',
  'suremail.info',
  'svk.jp',
  'sweetxxx.de',
  'tagyourself.com',
  'talkinator.com',
  'tapchicuoihoi.com',
  'techemail.com',
  'techgroup.me',
  'teewars.org',
  'telecomix.pl',
  'teleworm.com',
  'teleworm.us',
  'temp-mail.de',
  'temp-mail.ru',
  'temp.emeraldwebmail.com',
  'temp.headstrong.de',
  'tempail.com',
  'tempail.eu',
  'tempemail.biz',
  'tempemail.co.za',
  'tempemail.com',
  'tempemail.net',
  'tempinbox.co.uk',
  'tempinbox.com',
  'tempmail.de',
  'tempmail.eu',
  'tempmail.it',
  'tempmail.net',
  'tempmail.us',
  'tempmail2.com',
  'tempmaildemo.com',
  'tempmailer.com',
  'tempmailer.de',
  'tempomail.fr',
  'temporarily.de',
  'temporarioemail.com.br',
  'temporaryemail.net',
  'temporaryemail.us',
  'temporaryforwarding.com',
  'temporaryinbox.com',
  'temporarymailaddress.com',
  'tempthe.net',
  'thankspammersnot.com',
  'thankyou2010.com',
  'thecloudindex.com',
  'thelimestones.com',
  'thisis-notmy.email',
  'thismail.net',
  'throwawayemailaddress.com',
  'tilien.com',
  'tittbit.in',
  'tmailinator.com',
  'toiea.com',
  'toomail.biz',
  'topranklist.de',
  'tradermail.info',
  'trash-amil.com',
  'trash-mail.at',
  'trash-mail.cf',
  'trash-mail.com',
  'trash-mail.de',
  'trash-mail.ga',
  'trash-mail.gq',
  'trash-mail.ml',
  'trash-mail.tk',
  'trash2009.com',
  'trash2010.com',
  'trash2011.com',
  'trashbox.eu',
  'trashdevil.com',
  'trashdevil.de',
  'trashmail.at',
  'trashmail.de',
  'trashmail.me',
  'trashmail.net',
  'trashmail.org',
  'trashmail.ws',
  'trashmailer.com',
  'trashymail.com',
  'trashymail.net',
  'trbvm.com',
  'trickmail.net',
  'trillianpro.com',
  'tryalert.com',
  'turual.com',
  'twinmail.de',
  'twoweekmail.com',
  'tyldd.com',
  'uggsrock.com',
  'umail.net',
  'upliftnow.com',
  'uplipht.com',
  'uroid.com',
  'us.af',
  'valemail.net',
  'venompen.com',
  'veryrealemail.com',
  'viditag.com',
  'viewcastmedia.com',
  'viewcastmedia.net',
  'viewcastmedia.org',
  'viralplays.com',
  'vkcode.ru',
  'vpn.st',
  'vsimcard.com',
  'vubby.com',
  'wasteland.rfc822.org',
  'webemail.me',
  'webm4il.info',
  'webuser.in',
  'wee.my',
  'weg-werf-email.de',
  'wegwerf-email-addressen.de',
  'wegwerf-emails.de',
  'wegwerfadresse.de',
  'wegwerfemail.com',
  'wegwerfemail.de',
  'wegwerfmail.de',
  'wegwerfmail.info',
  'wegwerfmail.net',
  'wegwerfmail.org',
  'wetrainbayarea.com',
  'wetrainbayarea.org',
  'wh4f.org',
  'whatiaas.com',
  'whatpaas.com',
  'whopy.com',
  'wilemail.com',
  'willhackforfood.biz',
  'willselfdestruct.com',
  'winemaven.info',
  'wolfsmail.tk',
  'wollan.info',
  'worldspace.link',
  'wronghead.com',
  'wuzup.net',
  'wuzupmail.net',
  'wwwnew.eu',
  'x.ip6.li',
  'xagloo.com',
  'xemaps.com',
  'xents.com',
  'xmaily.com',
  'xoxy.net',
  'yapped.net',
  'yeah.net',
  'yep.it',
  'yogamaven.com',
  'yomail.info',
  'yopmail.com',
  'yopmail.fr',
  'yopmail.gq',
  'yopmail.net',
  'yourdomain.com',
  'ypmail.webarnak.fr.eu.org',
  'yuurok.com',
  'z1p.biz',
  'za.com',
  'zehnminuten.de',
  'zehnminutenmail.de',
  'zippymail.info',
  'zoaxe.com',
  'zoemail.net',
  'zoemail.org',
  'zomg.info',
  'zxcv.com',
  'zxcvbnm.com',
  'zzz.com',
]);

/**
 * Check if an email is from a disposable/temporary email provider
 * @param email - Email address to check
 * @returns true if disposable, false if legitimate
 */
export function isDisposableEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  
  const domain = email.toLowerCase().split('@')[1];
  if (!domain) return false;
  
  return DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

/**
 * Validate email format and check for disposable
 * @param email - Email address to validate
 * @returns { valid: boolean, reason?: string }
 */
export function validateEmail(email: string): { valid: boolean; reason?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, reason: 'Email is required' };
  }

  // Basic format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, reason: 'Invalid email format' };
  }

  // Check for disposable email
  if (isDisposableEmail(email)) {
    return { valid: false, reason: 'Disposable email addresses are not allowed' };
  }

  return { valid: true };
}

// ============================================
// XSS PROTECTION
// ============================================

/**
 * Escape HTML special characters to prevent XSS
 * @param str - String to escape
 * @returns Escaped string
 */
export function escapeHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };
  
  return str.replace(/[&<>"'`=/]/g, (char) => htmlEscapes[char] || char);
}

/**
 * Strip all HTML tags from a string
 * @param str - String to strip
 * @returns Clean string without HTML
 */
export function stripHtml(str: string): string {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Remove potentially dangerous patterns from strings
 * @param str - String to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(str: string): string {
  if (!str || typeof str !== 'string') return '';
  
  return str
    .trim()
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove data: protocol (except images)
    .replace(/data:(?!image\/)/gi, '')
    // Remove event handlers
    .replace(/on\w+\s*=/gi, '')
    // Remove script-like patterns
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove expression() in CSS
    .replace(/expression\s*\(/gi, '')
    // Remove url() with javascript
    .replace(/url\s*\(\s*['"]?\s*javascript:/gi, '');
}

// ============================================
// RATE LIMITING (In-Memory - use Redis in production)
// ============================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Simple in-memory rate limiter
 * For production, use Redis or a proper rate limiting service
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Clean up expired entries periodically
  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!entry || now > entry.resetTime) {
    // New window
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetTime - now,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetIn: entry.resetTime - now,
  };
}

// ============================================
// CSRF PROTECTION
// ============================================

/**
 * Generate a CSRF token
 * @returns Random token string
 */
export function generateCsrfToken(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Validate origin header against allowed origins
 * @param origin - Origin header value
 * @param allowedOrigins - List of allowed origins
 * @returns true if valid
 */
export function validateOrigin(origin: string | null, allowedOrigins: string[]): boolean {
  if (!origin) return false;
  return allowedOrigins.some(allowed => origin === allowed || origin.endsWith(allowed));
}

// ============================================
// SECURE COOKIE OPTIONS
// ============================================

export const secureCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

// ============================================
// INPUT VALIDATION HELPERS
// ============================================

/**
 * Validate that a string only contains allowed characters
 * @param str - String to validate
 * @param pattern - Regex pattern of allowed characters
 * @returns true if valid
 */
export function validateCharacters(str: string, pattern: RegExp = /^[\w\s\-.,!?'"@#$%&*()]+$/): boolean {
  if (!str || typeof str !== 'string') return false;
  return pattern.test(str);
}

/**
 * Check for SQL injection patterns
 * @param str - String to check
 * @returns true if suspicious patterns found
 */
export function hasSqlInjectionPattern(str: string): boolean {
  if (!str || typeof str !== 'string') return false;
  
  const patterns = [
    /(\s|^)(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|FETCH|DECLARE|TRUNCATE)(\s|$)/i,
    /--/,
    /\/\*/,
    /;\s*(SELECT|INSERT|UPDATE|DELETE|DROP)/i,
    /'\s*(OR|AND)\s*'?\d*'?\s*=\s*'?\d*'?/i,
    /'\s*(OR|AND)\s*''='/i,
  ];
  
  return patterns.some(pattern => pattern.test(str));
}

// ============================================
// SECURITY HEADERS HELPER
// ============================================

export const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://accounts.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.supabase.co",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://accounts.google.com",
    "frame-src 'self' https://accounts.google.com https://*.supabase.co",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};
