#!/usr/bin/env python3
"""
anjali_suar_graphic.py
Pygame version of the "Anjali Suar" 10-round game with pig graphics and buttons.
No external images required; the pig is drawn with shapes.
"""

import pygame
import sys
import random

# --- Configuration ---
WIDTH, HEIGHT = 900, 600
FPS = 60
TOTAL_ROUNDS = 10
START_LIVES = 3
BUTTON_W, BUTTON_H = 160, 60

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
PINK = (255, 175, 200)
DARK_PINK = (225, 100, 140)
GRAY = (220, 220, 220)
RED = (220, 50, 50)
GREEN = (50, 180, 70)
YELLOW = (245, 230, 120)
BG_COLOR = (30, 35, 48)

# Prompts
PROMPTS = [
    "Pick the glowing key from the floor?",
    "Cross the creaky bridge?",
    "Eat the suspicious berry?",
    "Open the locked chest?",
    "Talk to the mysterious stranger?",
    "Climb the tall ladder?",
    "Step into the foggy path?",
    "Light the dark lantern?",
    "Touch the shimmering pool?",
    "Follow the whispering voice?"
]

# Initialize Pygame
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("ANJALI SUAR — Graphic Edition")
clock = pygame.time.Clock()
font_big = pygame.font.SysFont("Arial", 36, bold=True)
font_med = pygame.font.SysFont("Arial", 24)
font_small = pygame.font.SysFont("Arial", 18)

# Button helper
class Button:
    def __init__(self, rect, text, color_bg, color_text=BLACK):
        self.rect = pygame.Rect(rect)
        self.text = text
        self.color_bg = color_bg
        self.color_text = color_text

    def draw(self, surf):
        pygame.draw.rect(surf, self.color_bg, self.rect, border_radius=12)
        pygame.draw.rect(surf, BLACK, self.rect, 2, border_radius=12)
        txt = font_med.render(self.text, True, self.color_text)
        txtr = txt.get_rect(center=self.rect.center)
        surf.blit(txt, txtr)

    def clicked(self, pos):
        return self.rect.collidepoint(pos)

# Pig drawing (simple pig using shapes)
def draw_pig(surf, x, y, scale=1.0, hop_offset=0):
    """Draw a pig centered approximately at (x,y). hop_offset moves pig up/down for animation."""
    s = max(0.4, scale)
    # body
    body_rect = pygame.Rect(0, 0, int(260 * s), int(160 * s))
    body_rect.center = (x, y + int(10 * s) + hop_offset)
    pygame.draw.ellipse(surf, PINK, body_rect)
    pygame.draw.ellipse(surf, BLACK, body_rect, 2)

    # head
    head_rect = pygame.Rect(0, 0, int(120 * s), int(100 * s))
    head_rect.center = (x - int(110 * s), y - int(10 * s) + hop_offset)
    pygame.draw.ellipse(surf, PINK, head_rect)
    pygame.draw.ellipse(surf, BLACK, head_rect, 2)

    # snout
    snout = pygame.Rect(0, 0, int(66 * s), int(44 * s))
    snout.center = (head_rect.centerx - int(8 * s), head_rect.centery + int(8 * s))
    pygame.draw.ellipse(surf, DARK_PINK, snout)
    pygame.draw.ellipse(surf, BLACK, snout, 2)
    # nostrils
    pygame.draw.circle(surf, BLACK, (snout.centerx - int(12 * s), snout.centery), int(4 * s))
    pygame.draw.circle(surf, BLACK, (snout.centerx + int(6 * s), snout.centery), int(4 * s))

    # eyes
    eye_y = head_rect.centery - int(18 * s)
    pygame.draw.circle(surf, BLACK, (head_rect.centerx - int(20 * s), eye_y), int(6 * s))
    pygame.draw.circle(surf, BLACK, (head_rect.centerx + int(6 * s), eye_y), int(6 * s))

    # ears
    pygame.draw.polygon(surf, PINK, [(head_rect.left + int(8 * s), head_rect.top + int(6 * s)),
                                    (head_rect.left + int(28 * s), head_rect.top - int(18 * s)),
                                    (head_rect.left + int(44 * s), head_rect.top + int(6 * s))])
    pygame.draw.polygon(surf, PINK, [(head_rect.left + int(64 * s), head_rect.top + int(6 * s)),
                                    (head_rect.left + int(86 * s), head_rect.top - int(10 * s)),
                                    (head_rect.left + int(104 * s), head_rect.top + int(6 * s))])

    # legs (simple rectangles)
    leg_w, leg_h = int(22 * s), int(40 * s)
    legs_x = [body_rect.left + int(40 * s), body_rect.left + int(110 * s), body_rect.left + int(180 * s), body_rect.left + int(240 * s)]
    for lx in legs_x:
        leg = pygame.Rect(lx, body_rect.bottom - leg_h + hop_offset, leg_w, leg_h)
        pygame.draw.rect(surf, PINK, leg)
        pygame.draw.rect(surf, BLACK, leg, 2)

    # tail
    tail_center = (body_rect.right - int(8 * s), body_rect.top + int(24 * s))
    pygame.draw.arc(surf, DARK_PINK, (tail_center[0], tail_center[1], int(40 * s), int(40 * s)), 3.0, 5.0, int(4 * s))

# Draw a simple confetti-like burst
def draw_confetti(surf):
    for _ in range(25):
        x = random.randint(60, WIDTH - 60)
        y = random.randint(120, HEIGHT - 120)
        r = random.randint(3, 8)
        pygame.draw.circle(surf, (random.randint(50,255), random.randint(50,255), random.randint(50,255)), (x, y), r)

# Main game function
def play_graphic_game():
    lives = START_LIVES
    score = 0
    round_num = 1
    pig_hop_timer = 0
    pig_hop_dir = 1
    game_state = "intro"  # intro, playing, anim_fail, finished
    fail_anim_timer = 0

    yes_btn = Button(((WIDTH // 2) - BUTTON_W - 20, HEIGHT - 140, BUTTON_W, BUTTON_H), "YES", GREEN, BLACK)
    no_btn  = Button(((WIDTH // 2) + 20, HEIGHT - 140, BUTTON_W, BUTTON_H), "NO", RED, BLACK)

    name = ""
    input_active = False
    input_rect = pygame.Rect(WIDTH//2 - 200, HEIGHT//2 + 20, 400, 40)

    # Helper to compute whether correct answer is yes (randomized)
    def correct_is_yes_for_round(r):
        difficulty = min(0.6, 0.2 + (r - 1) * 0.04)
        return random.random() < difficulty

    correct_answer_is_yes = correct_is_yes_for_round(round_num)

    while True:
        dt = clock.tick(FPS) / 1000.0
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if game_state == "intro":
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_RETURN and name.strip():
                        game_state = "playing"
                        correct_answer_is_yes = correct_is_yes_for_round(round_num)
                    elif event.key == pygame.K_BACKSPACE:
                        name = name[:-1]
                    else:
                        if len(name) < 20 and event.unicode.isprintable():
                            name += event.unicode

            elif game_state == "playing":
                if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                    pos = event.pos
                    if yes_btn.clicked(pos):
                        player_choice_yes = True
                        # evaluate
                        if player_choice_yes == correct_answer_is_yes:
                            score += 1
                        else:
                            lives -= 1
                            game_state = "anim_fail"
                            fail_anim_timer = 0.0
                    elif no_btn.clicked(pos):
                        player_choice_yes = False
                        if player_choice_yes == correct_answer_is_yes:
                            score += 1
                        else:
                            lives -= 1
                            game_state = "anim_fail"
                            fail_anim_timer = 0.0

                    # advance round unless animating fail
                    if game_state == "playing":
                        round_num += 1
                        if round_num > TOTAL_ROUNDS or lives <= 0:
                            game_state = "finished"
                        else:
                            correct_answer_is_yes = correct_is_yes_for_round(round_num)

            elif game_state == "anim_fail":
                # allow skipping the failure animation by clicking once
                if event.type == pygame.MOUSEBUTTONDOWN or event.type == pygame.KEYDOWN:
                    # After animation, either continue or finish
                    round_num += 1
                    if round_num > TOTAL_ROUNDS or lives <= 0:
                        game_state = "finished"
                    else:
                        game_state = "playing"
                        correct_answer_is_yes = correct_is_yes_for_round(round_num)

            elif game_state == "finished":
                if event.type == pygame.KEYDOWN:
                    if event.key == pygame.K_r:
                        # reset
                        lives = START_LIVES
                        score = 0
                        round_num = 1
                        game_state = "playing"
                        correct_answer_is_yes = correct_is_yes_for_round(round_num)
                    elif event.key == pygame.K_ESCAPE:
                        pygame.quit()
                        sys.exit()

        # Update pig hop animation
        pig_hop_timer += dt
        if pig_hop_timer > 0.08:
            pig_hop_timer = 0
            pig_hop_dir *= -1
        hop_offset = -6 if pig_hop_dir > 0 else 0

        # Drawing
        screen.fill(BG_COLOR)

        # Header
        header = font_big.render("ANJALI SUAR — Graphic Edition", True, YELLOW)
        screen.blit(header, (20, 12))
        sub = font_small.render(f"Player: {name or '...' }   Lives: {lives}   Round: {round_num}/{TOTAL_ROUNDS}   Score: {score}", True, WHITE)
        screen.blit(sub, (20, 60))

        if game_state == "intro":
            # Title + name input
            msg = font_med.render("Enter your name and press Enter to start:", True, WHITE)
            screen.blit(msg, (WIDTH//2 - msg.get_width()//2, HEIGHT//2 - 80))
            pygame.draw.rect(screen, WHITE, input_rect, 2)
            name_surface = font_med.render(name, True, WHITE)
            screen.blit(name_surface, (input_rect.x + 10, input_rect.y + 6))
            # pig on intro
            draw_pig(screen, WIDTH//2 + 240, HEIGHT//2 - 20, 0.9, hop_offset)

        elif game_state == "playing":
            # Draw prompt box
            pygame.draw.rect(screen, GRAY, (60, 120, WIDTH - 120, 120), border_radius=8)
            prompt_text = PROMPTS[(round_num - 1) % len(PROMPTS)]
            prompt = font_big.render(f"Round {round_num}: {prompt_text}", True, BLACK)
            screen.blit(prompt, (80, 150))

            # Buttons
            yes_btn.draw(screen)
            no_btn.draw(screen)

            # Pig (friendly) on the right
            draw_pig(screen, WIDTH - 220, HEIGHT//2 + 20, 0.9, hop_offset)

            # small hint
            hint = font_small.render("Click YES or NO (or press buttons). Survive the rounds!", True, WHITE)
            screen.blit(hint, (80, 260))

            # show which correct answer (debug) - commented out for production
            # debug = font_small.render(f"DEBUG: correct_is_yes={correct_answer_is_yes}", True, WHITE)
            # screen.blit(debug, (80, 290))

        elif game_state == "anim_fail":
            # Failure animation: pig hops and "anjali suar" flashes
            # background flash
            if fail_anim_timer < 0.3:
                screen.fill((random.randint(40, 255), random.randint(20, 120), random.randint(20, 120)))
            # draw pig larger and shaken
            shake = int((fail_anim_timer * 20) % 7) - 3
            draw_pig(screen, WIDTH//2 + shake, HEIGHT//2 + 10 - int(20 * min(1, fail_anim_timer)), 1.1, -12)
            # big failure text
            big_text = font_big.render("anjali suar", True, RED)
            st = big_text.get_rect(center=(WIDTH//2, HEIGHT//2 - 140))
            screen.blit(big_text, st)
            # small explanation text
            explain = font_med.render("Wrong choice! Click or press any key to continue...", True, WHITE)
            screen.blit(explain, (WIDTH//2 - explain.get_width()//2, HEIGHT//2 + 130))

            # confetti on success? no - here we do a short shaking pig then continue
            fail_anim_timer += dt
            if fail_anim_timer > 1.2:
                # After animation ends, advance to next round automatically
                round_num += 1
                if round_num > TOTAL_ROUNDS or lives <= 0:
                    game_state = "finished"
                else:
                    game_state = "playing"
                    correct_answer_is_yes = correct_is_yes_for_round(round_num)

        elif game_state == "finished":
            # Final screen
            title = font_big.render("Game Over", True, YELLOW)
            screen.blit(title, (WIDTH//2 - title.get_width()//2, 120))
            summary = font_med.render(f"Player: {name or 'Player'}    Score: {score}/{TOTAL_ROUNDS}    Lives remaining: {lives}", True, WHITE)
            screen.blit(summary, (WIDTH//2 - summary.get_width()//2, 190))

            if lives > 0 and score == TOTAL_ROUNDS:
                win = font_big.render("CONGRATS — You survived every round! You win!", True, GREEN)
                screen.blit(win, (WIDTH//2 - win.get_width()//2, 260))
                draw_confetti(screen)
            elif lives > 0:
                msg = font_med.render("Not bad. Press R to play again.", True, WHITE)
                screen.blit(msg, (WIDTH//2 - msg.get_width()//2, 260))
                # show calm pig
                draw_pig(screen, WIDTH//2 + 240, HEIGHT//2 + 30, 1.0, 0)
            else:
                lose = font_big.render("You lost all your lives. Better luck next time.", True, RED)
                screen.blit(lose, (WIDTH//2 - lose.get_width()//2, 260))
                draw_pig(screen, WIDTH//2 + 240, HEIGHT//2 + 30, 0.95, -6)

            tip = font_small.render("Press R to retry, ESC to quit.", True, WHITE)
            screen.blit(tip, (WIDTH//2 - tip.get_width()//2, HEIGHT - 60))

        # footer
        footer = font_small.render("Tip: respond with clicks. The correct answer is randomized each round.", True, WHITE)
        screen.blit(footer, (20, HEIGHT - 32))

        pygame.display.flip()

# Run the game
if __name__ == "__main__":
    play_graphic_game()