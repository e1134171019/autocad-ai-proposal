import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const skillPath = path.resolve(
  process.cwd(),
  '.agents/skills/b2b-technical-proposal-messaging/SKILL.md'
);

function readSkill() {
  return readFileSync(skillPath, 'utf8');
}

describe('b2b technical proposal messaging skill contract', () => {
  it('exists as the dedicated reusable skill', () => {
    expect(existsSync(skillPath)).toBe(true);
  });

  it('requires source understanding before copy for existing assets', () => {
    const source = readSkill();
    expect(source).toMatch(/Existing Asset Gate/i);
    expect(source).toMatch(/Content Model/i);
    expect(source).toMatch(/interaction|interactive/i);
    expect(source).toMatch(/version conflict|conflicting version/i);
  });

  it('orders strategy and titles after content understanding', () => {
    const source = readSkill();
    expect(source).toMatch(/Positioning Snapshot/i);
    expect(source).toMatch(/Narrative Map/i);
    expect(source).toMatch(/Section Content Contract/i);
    expect(source).toMatch(/title.*downstream|titles.*after/i);
  });

  it('keeps source, strategy, evidence, and responsibility boundaries explicit', () => {
    const source = readSkill();
    expect(source).toMatch(/current-state|source fact/i);
    expect(source).toMatch(/strategic recommendation|proposed change/i);
    expect(source).toMatch(/proven|concept simulation|unknown/i);
    expect(source).toMatch(/deterministic/i);
    expect(source).toMatch(/AI/i);
    expect(source).toMatch(/eden-engineering-copy/i);
  });

  it('supports greenfield and remains domain-generic', () => {
    const source = readSkill();
    expect(source).toMatch(/Greenfield/i);
    expect(source).not.toMatch(/ACT0[1-9]|AutoCAD|DWG/);
  });
});
