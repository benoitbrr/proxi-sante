-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE structure_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Everyone can view profiles
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- ============================================
-- STRUCTURES POLICIES
-- ============================================

-- Active structures are viewable by everyone
CREATE POLICY "Active structures are viewable by everyone"
  ON structures FOR SELECT
  USING (is_active = true OR user_id = auth.uid());

-- Structure owners can insert their structure
CREATE POLICY "Structure owners can insert"
  ON structures FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Structure owners can update their structure
CREATE POLICY "Structure owners can update"
  ON structures FOR UPDATE
  USING (auth.uid() = user_id);

-- Admins can do everything
CREATE POLICY "Admins can do everything on structures"
  ON structures FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- STRUCTURE MEDIA POLICIES
-- ============================================

-- Media of active structures is viewable by everyone
CREATE POLICY "Structure media are viewable by everyone"
  ON structure_media FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM structures
      WHERE structures.id = structure_media.structure_id
      AND (structures.is_active = true OR structures.user_id = auth.uid())
    )
  );

-- Structure owners can manage their media
CREATE POLICY "Structure owners can manage media"
  ON structure_media FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM structures
      WHERE structures.id = structure_media.structure_id
      AND structures.user_id = auth.uid()
    )
  );

-- ============================================
-- OFFERS POLICIES
-- ============================================

-- Active offers are viewable by everyone
CREATE POLICY "Active offers are viewable by everyone"
  ON offers FOR SELECT
  USING (
    is_active = true OR
    EXISTS (
      SELECT 1 FROM structures
      WHERE structures.id = offers.structure_id
      AND structures.user_id = auth.uid()
    )
  );

-- Structure owners can insert offers
CREATE POLICY "Structure owners can insert offers"
  ON offers FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM structures
      WHERE structures.id = structure_id
      AND structures.user_id = auth.uid()
    )
  );

-- Structure owners can update their offers
CREATE POLICY "Structure owners can update offers"
  ON offers FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM structures
      WHERE structures.id = offers.structure_id
      AND structures.user_id = auth.uid()
    )
  );

-- Structure owners can delete their offers
CREATE POLICY "Structure owners can delete offers"
  ON offers FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM structures
      WHERE structures.id = offers.structure_id
      AND structures.user_id = auth.uid()
    )
  );

-- Admins can do everything on offers
CREATE POLICY "Admins can do everything on offers"
  ON offers FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- CONVERSATIONS POLICIES
-- ============================================

-- Participants can view their conversations
CREATE POLICY "Participants can view conversations"
  ON conversations FOR SELECT
  USING (
    auth.uid() = medecin_id OR
    EXISTS (
      SELECT 1 FROM structures
      WHERE structures.id = conversations.structure_id
      AND structures.user_id = auth.uid()
    )
  );

-- Medecins can create conversations
CREATE POLICY "Medecins can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = medecin_id);

-- ============================================
-- MESSAGES POLICIES
-- ============================================

-- Participants can view messages in their conversations
CREATE POLICY "Participants can view messages"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (
        conversations.medecin_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM structures
          WHERE structures.id = conversations.structure_id
          AND structures.user_id = auth.uid()
        )
      )
    )
  );

-- Participants can send messages
CREATE POLICY "Participants can send messages"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = conversation_id
      AND (
        conversations.medecin_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM structures
          WHERE structures.id = conversations.structure_id
          AND structures.user_id = auth.uid()
        )
      )
    )
  );

-- Users can mark messages as read
CREATE POLICY "Users can update message read status"
  ON messages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (
        conversations.medecin_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM structures
          WHERE structures.id = conversations.structure_id
          AND structures.user_id = auth.uid()
        )
      )
    )
  );

-- ============================================
-- FAVORITES POLICIES
-- ============================================

-- Users can view their own favorites
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  USING (auth.uid() = user_id);

-- Users can add favorites
CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can remove their favorites
CREATE POLICY "Users can remove favorites"
  ON favorites FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- REPORTS POLICIES
-- ============================================

-- Users can create reports
CREATE POLICY "Users can create reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);

-- Admins can view all reports
CREATE POLICY "Admins can view reports"
  ON reports FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admins can update reports
CREATE POLICY "Admins can update reports"
  ON reports FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- SUBSCRIPTIONS POLICIES
-- ============================================

-- Structure owners can view their subscription
CREATE POLICY "Structure owners can view subscription"
  ON subscriptions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM structures
      WHERE structures.id = subscriptions.structure_id
      AND structures.user_id = auth.uid()
    )
  );

-- Service role can manage subscriptions (for Stripe webhooks)
CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');
