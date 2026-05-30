import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Trash2, Pin, LogOut } from 'lucide-react';
import { usePortfolio } from '../contexts/PortfolioContext';

const AdminPanel = ({ onLogout, videos, setVideos }) => {
  const { t } = usePortfolio();
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoFile, setNewVideoFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewVideoFile(file);
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newVideoTitle.trim() || !newVideoFile) return;

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newVideo = {
          id: Date.now(),
          title: newVideoTitle.trim(),
          videoUrl: event.target.result,
          likes: 0,
          dislikes: 0,
          comments: [],
        };

        setVideos((prev) => [...prev, newVideo]);
        setNewVideoTitle('');
        setNewVideoFile(null);
        setUploading(false);
      };

      reader.readAsDataURL(newVideoFile);
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploading(false);
    }
  };

  const handleDeleteVideo = (videoId) => {
    if (window.confirm(t.admin.manage.deleteConfirm)) {
      setVideos((prev) => prev.filter((v) => v.id !== videoId));
    }
  };

  const handlePinComment = (videoId, commentId) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === videoId) {
          return {
            ...v,
            comments: v.comments.map((c) => ({
              ...c,
              pinned: c.id === commentId ? !c.pinned : c.pinned,
            })),
          };
        }
        return v;
      })
    );
  };

  const handleDeleteComment = (videoId, commentId) => {
    if (window.confirm(t.admin.manage.deleteCommentConfirm)) {
      setVideos((prev) =>
        prev.map((v) => {
          if (v.id === videoId) {
            return { ...v, comments: v.comments.filter((c) => c.id !== commentId) };
          }
          return v;
        })
      );
    }
  };

  return (
    <section className="py-24 relative overflow-hidden min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h2 className="section-title mb-0">{t.admin.panel.title}</h2>
            <p className="text-white/60 mt-4">{t.admin.panel.description}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full font-medium text-white hover:bg-white/10 transition-all"
          >
            <LogOut size={20} />
            {t.admin.panel.logout}
          </button>
        </div>

        <div className="mb-16 glass-card p-8">
          <h3 className="text-xl font-bold mb-6 text-white">{t.admin.panel.upload.title}</h3>
          <form onSubmit={handleAddVideo} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">{t.admin.panel.upload.videoTitle}</label>
              <input
                type="text"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder=""
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">{t.admin.panel.upload.videoFile}</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80 transition-all"
                required
              />
              {newVideoFile && (
                <p className="text-sm text-white/60">
                  {t.admin.panel.upload.selected}: {newVideoFile.name} ({(newVideoFile.size / (1024 * 1024)).toFixed(2)} MB)
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={uploading || !newVideoFile}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={20} />
              {uploading ? t.admin.panel.upload.uploading : t.admin.panel.upload.uploadBtn}
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-bold text-white">{t.admin.panel.manage.title}</h3>
          {videos.map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-2">{video.title}</h4>
                  <div className="flex gap-6 text-white/60 text-sm">
                    <span>{t.admin.panel.manage.likes}: {video.likes}</span>
                    <span>{t.admin.panel.manage.dislikes}: {video.dislikes}</span>
                    <span>{t.admin.panel.manage.comments}: {video.comments.length}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteVideo(video.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <Trash2 size={18} />
                  {t.admin.panel.manage.deleteVideo}
                </button>
              </div>
              <div className="aspect-video bg-black/30 rounded-xl overflow-hidden mb-6">
                <video src={video.videoUrl} controls className="w-full h-full object-cover" />
              </div>
              <div className="space-y-4">
                <h5 className="text-lg font-medium text-white/80">{t.admin.panel.manage.commentsTitle}</h5>
                {video.comments.length === 0 ? (
                  <p className="text-white/50 text-sm">{t.admin.panel.manage.noComments}</p>
                ) : (
                  video.comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-white/5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-primary">{comment.username}</span>
                          {comment.pinned && <span className="text-xs text-primary/80">📌 {t.admin.panel.manage.pinned}</span>}
                        </div>
                        <p className="text-sm text-white/60">{comment.text}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePinComment(video.id, comment.id)}
                          className="p-2 bg-white/10 rounded-lg text-white/60 hover:text-primary transition-all"
                          title={comment.pinned ? t.admin.panel.manage.unpinTooltip : t.admin.panel.manage.pinTooltip}
                        >
                          <Pin size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(video.id, comment.id)}
                          className="p-2 bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
