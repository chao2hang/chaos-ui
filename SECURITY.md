# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in Chaos UI, please report it responsibly.

### How to Report

1. **Do NOT open a public GitHub issue.**
2. Email the security team at: `security@qxyfoods.com`
3. Include the following in your report:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
   - Your contact information

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Fix or Mitigation**: Depending on severity:
  - Critical: Within 7 days
  - High: Within 30 days
  - Medium/Low: Next release cycle

### Disclosure Policy

- We follow responsible disclosure.
- We will credit reporters (unless they prefer to remain anonymous).
- We request a 90-day embargo before public disclosure.

## Security Best Practices for Consumers

### XSS Prevention

- Chaos UI uses React's built-in XSS protection (auto-escaping).
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary.
- Sanitize any user-generated HTML before rendering.

### Token Security

- Store authentication tokens in `httpOnly` cookies when possible.
- Avoid storing tokens in `localStorage` for production applications.
- Use the `api-client` library's token refresh mechanism.

### Dependency Security

- Run `npm audit` regularly.
- Keep dependencies up to date.
- Review Dependabot PRs promptly.

### Content Security Policy (CSP)

Recommended CSP headers for applications using Chaos UI:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  font-src 'self' data:;
  connect-src 'self';
```

## Security Features

Chaos UI includes the following security-conscious features:

- **Field Masking**: `field-mask` component for PII data (phone, ID card, bank card)
- **Permission Wrappers**: `permission-wrapper` for component-level access control
- **Data Scope Filtering**: `data-scope-filter` for row-level data access control
- **Watermark**: `watermark` component for screenshot traceability
- **No Hardcoded Secrets**: ESLint rules prevent committing credentials
