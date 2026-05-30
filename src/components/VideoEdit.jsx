import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const VideoEdit = ({ videos: propVideos, setVideos: setPropVideos }) => {
  const { t } = usePortfolio();
  const [videos, setVideos] = useState(propVideos || []);
  const [newComments, setNewComments] = useState({});
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [dislikedVideos, setDislikedVideos] = useState(new Set());

  const updateVideos = (newVideos) => {
    setVideos(newVideos);
    if (setPropVideos) {
      setPropVideos(newVideos);
    }
  };

  const handleLike = (videoId) => {
    const newLiked = new Set(likedVideos);
    const newDisliked = new Set(dislikedVideos);

    if (newLiked.has(videoId)) {
      newLiked.delete(videoId);
    } else {
      newLiked.add(videoId);
      newDisliked.delete(videoId);
    }

    setLikedVideos(newLiked);
    setDislikedVideos(newDisliked);

    updateVideos(
      videos.map((v) => {
        if (v.id === videoId) {
          let likes = v.likes;
          let dislikes = v.dislikes;
          if (newLiked.has(videoId)) likes++;
          else likes--;
          if (!newDisliked.has(videoId) && v.dislikes > dislikes) dislikes--;
          return { ...v, likes, dislikes };
        }
        return v;
      })
    );
  };

  const handleDislike = (videoId) => {
    const newLiked = new Set(likedVideos);
    const newDisliked = new Set(dislikedVideos);

    if (newDisliked.has(videoId)) {
      newDisliked.delete(videoId);
    } else {
      newDisliked.add(videoId);
      newLiked.delete(videoId);
    }

    setLikedVideos(newLiked);
    setDislikedVideos(newDisliked);

    updateVideos(
      videos.map((v) => {
        if (v.id === videoId) {
          let likes = v.likes;
          let dislikes = v.dislikes;
          if (newDisliked.has(videoId)) dislikes++;
          else dislikes--;
          if (!newLiked.has(videoId) && v.likes > likes) likes--;
          return { ...v, likes, dislikes };
        }
        return v;
      })
    );
  };

  const handleCommentChange = (videoId, value) => {
    setNewComments((prev) => ({ ...prev, [videoId]: value }));
  };

  const handleCommentSubmit = (videoId) => {
    const text = newComments[videoId];
    if (!text.trim()) return;

    updateVideos(
      videos.map((v) => {
        if (v.id === videoId) {
          return {
            ...v,
            comments: [
              ...v.comments,
              { id: Date.now(), username: 'GuestUser', text: text.trim(), pinned: false },
            ],
          };
        }
        return v;
      })
    );

    setNewComments((prev) => ({ ...prev, [videoId]: '' }));
  };

  const sortedComments = (comments) => {
    return [...comments].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });
  };

  return (
    <section id="video-edit" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">{t.videoEdit.title}</h2>
          <p className="text-white/60 text-lg">{t.videoEdit.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, i) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card overflow-hidden group"
            >
              <div className="relative aspect-video overflow-hidden">
                <video
                  src={video.videoUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center gap-6 mb-6">
                  <button
                    onClick={() => handleLike(video.id)}
                    className={`flex items-center gap-2 transition-all ${
                      likedVideos.has(video.id) ? 'text-primary' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <ThumbsUp size={20} />
                    <span className="text-sm font-medium">{video.likes}</span>
                  </button>
                  <button
                    onClick={() => handleDislike(video.id)}
                    className={`flex items-center gap-2 transition-all ${
                      dislikedVideos.has(video.id) ? 'text-red-400' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <ThumbsDown size={20} />
                    <span className="text-sm font-medium">{video.dislikes}</span>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <MessageSquare size={18} />
                    <span className="text-sm font-medium">{t.videoEdit.comments}</span>
                  </div>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {sortedComments(video.comments).map((comment) => (
                      <div key={comment.id} className={`p-3 rounded-xl bg-white/5 ${comment.pinned ? 'border border-primary/50' : ''}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-primary">{comment.username}</span>
                          {comment.pinned && <span className="text-xs text-primary/80">📌</span>}
                        </div>
                        <p className="text-sm text-white/60">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newComments[video.id] || ''}
                      onChange={(e) => handleCommentChange(video.id, e.target.value)}
                      placeholder={t.videoEdit.writeComment}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                      onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit(video.id)}
                    />
                    <button
                      onClick={() => handleCommentSubmit(video.id)}
                      className="p-2 bg-primary rounded-xl hover:bg-primary/80 transition-all"
                    >
                      <Send size={18} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoEdit;
